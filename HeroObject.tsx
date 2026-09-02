import { useMemo, useRef } from 'react'
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useIsCoarsePointer } from '../hooks/useIsCoarsePointer'

const SPIKE_COUNT_DESKTOP = 260
const SPIKE_COUNT_MOBILE = 100

const SPHERE_RADIUS = 1.55
const CORE_RADIUS = SPHERE_RADIUS * 0.92

const SPIKE_LENGTH_MIN = 0.16
const SPIKE_LENGTH_MAX = 0.5

const SPIKE_RADIUS_TOP = 0.045
const SPIKE_RADIUS_BOTTOM = 0.085

const HOVER_RADIUS = 0.95
const HOVER_SHRINK_STRENGTH = 0.6
const LENGTH_DAMP_LAMBDA = 7

const IDLE_ROTATION_SPEED = 0.055
const BOB_AMPLITUDE = 0.055
const BOB_SPEED = 0.55
const BREATH_AMPLITUDE_FRACTION = 0.06
const BREATH_SPEED = 0.9

const UP_AXIS = new THREE.Vector3(0, 1, 0)

function fibonacciSphere(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < count; i++) {
    const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = goldenAngle * i

    points.push(new THREE.Vector3(Math.cos(theta) * radiusAtY, y, Math.sin(theta) * radiusAtY))
  }

  return points
}

function createSpikeGeometry(colorRoot: THREE.Color, colorTip: THREE.Color) {
  const geometry = new THREE.CylinderGeometry(
    SPIKE_RADIUS_TOP,
    SPIKE_RADIUS_BOTTOM,
    1,
    6,
    1,
    false,
  )

  const position = geometry.attributes.position
  const colors = new Float32Array(position.count * 3)
  const mixed = new THREE.Color()

  for (let i = 0; i < position.count; i++) {
    const localY = position.getY(i)
    const t = THREE.MathUtils.clamp(localY + 0.5, 0, 1)
    mixed.copy(colorRoot).lerp(colorTip, t)
    colors[i * 3] = mixed.r
    colors[i * 3 + 1] = mixed.g
    colors[i * 3 + 2] = mixed.b
  }

  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  return geometry
}

interface SpikeInstance {
  basePosition: THREE.Vector3
  direction: THREE.Vector3
  orientation: THREE.Quaternion
  restLength: number
  currentLength: number
  breathPhase: number
}

function buildSpikeInstances(count: number): SpikeInstance[] {
  const spherePoints = fibonacciSphere(count)
  const instances: SpikeInstance[] = []

  for (const point of spherePoints) {
    const direction = point.clone().normalize()
    const basePosition = direction.clone().multiplyScalar(SPHERE_RADIUS)

    const facing = THREE.MathUtils.clamp(direction.z * 0.6 + direction.y * 0.2, -1, 1)
    const facingT = facing * 0.5 + 0.5
    const jitter = 0.85 + Math.random() * 0.3
    const restLength = THREE.MathUtils.lerp(SPIKE_LENGTH_MIN, SPIKE_LENGTH_MAX, facingT) * jitter

    const orientation = new THREE.Quaternion().setFromUnitVectors(UP_AXIS, direction)

    instances.push({
      basePosition,
      direction,
      orientation,
      restLength,
      currentLength: restLength,
      breathPhase: (direction.x + direction.y + direction.z) * Math.PI,
    })
  }

  return instances
}

function smoothFalloff(distance: number, radius: number): number {
  if (distance >= radius) return 0
  const x = 1 - distance / radius
  return x * x * (3 - 2 * x)
}

function createSoftShadowTexture(): THREE.Texture {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(20, 8, 30, 0.55)')
  gradient.addColorStop(0.6, 'rgba(20, 8, 30, 0.28)')
  gradient.addColorStop(1, 'rgba(20, 8, 30, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

interface SpikeClusterProps {
  spikeCount: number
  allowIdleMotion: boolean
  allowHover: boolean
}

function SpikeCluster({ spikeCount, allowIdleMotion, allowHover }: SpikeClusterProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const hoverTargetRef = useRef<THREE.Mesh>(null)

  const hoverPointRef = useRef<THREE.Vector3 | null>(null)
  const entranceScaleRef = useRef(0.82)

  const instances = useMemo(() => buildSpikeInstances(spikeCount), [spikeCount])

  const geometry = useMemo(
    () => createSpikeGeometry(new THREE.Color('#2c1454'), new THREE.Color('#c4b5fd')),
    [],
  )

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.42,
        metalness: 0.22,
      }),
    [],
  )

  const coreMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1c0e38'),
        roughness: 0.55,
        metalness: 0.1,
      }),
    [],
  )

  const shadowTexture = useMemo(() => createSoftShadowTexture(), [])

  useMemo(() => {
    const mesh = meshRef.current
    if (!mesh) return
    const tmpColor = new THREE.Color()
    const tmpMatrix = new THREE.Matrix4()
    const tmpQuat = new THREE.Quaternion()
    const tmpPos = new THREE.Vector3()

    instances.forEach((spike, index) => {
      const facing = spike.direction.z * 0.5 + 0.5
      tmpColor.setHSL(0.72, 0.55, THREE.MathUtils.lerp(0.32, 0.62, facing))
      mesh.setColorAt(index, tmpColor)

      tmpPos.copy(spike.basePosition).addScaledVector(spike.direction, spike.currentLength / 2)
      tmpQuat.copy(spike.orientation)
      tmpMatrix.compose(tmpPos, tmpQuat, new THREE.Vector3(1, spike.currentLength, 1))
      mesh.setMatrixAt(index, tmpMatrix)
    })

    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    mesh.instanceMatrix.needsUpdate = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instances])

  function handlePointerMove(event: ThreeEvent<PointerEvent>) {
    if (!allowHover || !groupRef.current) return
    const local = groupRef.current.worldToLocal(event.point.clone())
    hoverPointRef.current = local
  }

  function handlePointerLeave() {
    hoverPointRef.current = null
  }

  const tmpMatrix = useMemo(() => new THREE.Matrix4(), [])
  const tmpQuat = useMemo(() => new THREE.Quaternion(), [])
  const tmpScale = useMemo(() => new THREE.Vector3(1, 1, 1), [])
  const tmpPos = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, rawDelta) => {
    const mesh = meshRef.current
    const group = groupRef.current
    if (!mesh || !group) return

    const delta = Math.min(rawDelta, 1 / 30)
    const elapsed = state.clock.elapsedTime

    entranceScaleRef.current = THREE.MathUtils.damp(entranceScaleRef.current, 1, 4, delta)
    group.scale.setScalar(entranceScaleRef.current)

    if (allowIdleMotion) {
      group.rotation.y += IDLE_ROTATION_SPEED * delta
      group.position.y = Math.sin(elapsed * BOB_SPEED) * BOB_AMPLITUDE
    }

    const hoverPoint = hoverPointRef.current

    for (let i = 0; i < instances.length; i++) {
      const spike = instances[i]

      let target = spike.restLength
      if (hoverPoint) {
        const distance = spike.basePosition.distanceTo(hoverPoint)
        const influence = smoothFalloff(distance, HOVER_RADIUS)
        target = THREE.MathUtils.lerp(spike.restLength, spike.restLength * (1 - HOVER_SHRINK_STRENGTH), influence)
      }

      if (allowIdleMotion) {
        const breathe = Math.sin(elapsed * BREATH_SPEED + spike.breathPhase) * BREATH_AMPLITUDE_FRACTION * spike.restLength
        target += breathe
      }

      spike.currentLength = THREE.MathUtils.damp(spike.currentLength, target, LENGTH_DAMP_LAMBDA, delta)

      tmpPos.copy(spike.basePosition).addScaledVector(spike.direction, spike.currentLength / 2)
      tmpQuat.copy(spike.orientation)
      tmpScale.set(1, spike.currentLength, 1)
      tmpMatrix.compose(tmpPos, tmpQuat, tmpScale)
      mesh.setMatrixAt(i, tmpMatrix)
    }

    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <mesh geometry={new THREE.IcosahedronGeometry(CORE_RADIUS, 3)} material={coreMaterial} />

      <instancedMesh ref={meshRef} args={[geometry, material, spikeCount]} />

      <mesh
        ref={hoverTargetRef}
        visible={false}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerOut={handlePointerLeave}
      >
        <sphereGeometry args={[SPHERE_RADIUS + SPIKE_LENGTH_MAX * 0.5, 32, 32]} />
        <meshBasicMaterial />
      </mesh>

      <mesh position={[0, -SPHERE_RADIUS - 0.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[SPHERE_RADIUS * 1.7, 48]} />
        <meshBasicMaterial map={shadowTexture} transparent depthWrite={false} />
      </mesh>
    </group>
  )
}

export default function HeroObject() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isCoarsePointer = useIsCoarsePointer()

  const spikeCount = isCoarsePointer ? SPIKE_COUNT_MOBILE : SPIKE_COUNT_DESKTOP
  const allowIdleMotion = !prefersReducedMotion
  const allowHover = !prefersReducedMotion && !isCoarsePointer

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.15, 4.6], fov: 38 }}
      style={{ touchAction: 'none' }}
    >
      <ambientLight intensity={0.55} color="#cbb6ff" />
      <directionalLight position={[3.2, 4, 5]} intensity={1.15} color="#ffffff" />
      <directionalLight position={[-4, -1.5, -2.5]} intensity={0.35} color="#7c3aed" />
      <pointLight position={[0, 1.8, 3]} intensity={0.5} color="#e9d5ff" />

      <SpikeCluster spikeCount={spikeCount} allowIdleMotion={allowIdleMotion} allowHover={allowHover} />
    </Canvas>
  )
}
