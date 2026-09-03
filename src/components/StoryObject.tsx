import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePositionRef } from '../lib/scrollStory'
import { NODE_COUNT, STATE_LAYOUT, LAYOUTS, nodeFieldLayout } from './storyLayouts'
import { STORY_STATES } from '../lib/scrollStory'

const DAMP_LAMBDA = 4.2
const COLOR_ROOT = new THREE.Color('#2c1454')
const COLOR_TIP = new THREE.Color('#c4b5fd')
const COLOR_CONVERGED = new THREE.Color('#f5f0ff')

const INVESTIGATION_INDEX = STORY_STATES.indexOf('investigation')
const INSIGHT_INDEX = STORY_STATES.indexOf('insight')
const EXECUTION_INDEX = STORY_STATES.indexOf('execution')
const HERO_INDEX = STORY_STATES.indexOf('hero')
const CHALLENGE_INDEX = STORY_STATES.indexOf('challenge')
const CONCLUSION_INDEX = STORY_STATES.indexOf('conclusion')

function buildNeighborPairs(points: THREE.Vector3[], maxPerNode: number, maxDist: number) {
  const pairs: [number, number][] = []
  for (let i = 0; i < points.length; i++) {
    const distances: { j: number; d: number }[] = []
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue
      const d = points[i].distanceTo(points[j])
      if (d < maxDist) distances.push({ j, d })
    }
    distances.sort((a, b) => a.d - b.d)
    for (let k = 0; k < Math.min(maxPerNode, distances.length); k++) {
      const j = distances[k].j
      if (j > i) pairs.push([i, j])
    }
  }
  return pairs
}

export default function StoryObject() {
  const positionRef = usePositionRef()
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => new THREE.OctahedronGeometry(0.11, 0), [])
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.35, metalness: 0.3 }),
    [],
  )
  const coreGeometry = useMemo(() => new THREE.IcosahedronGeometry(1.42, 3), [])
  const coreMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: new THREE.Color('#1c0e38'), roughness: 0.5, metalness: 0.12 }),
    [],
  )

  const currentPositions = useMemo(() => LAYOUTS.sphere.map((v) => v.clone()), [])

  const investigationField = useMemo(() => nodeFieldLayout(), [])
  const neighborPairs = useMemo(() => buildNeighborPairs(investigationField, 2, 1.7), [investigationField])

  const lineGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const positions = new Float32Array(neighborPairs.length * 2 * 3)
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [neighborPairs])

  const lineMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ color: new THREE.Color('#a78bfa'), transparent: true, opacity: 0 }),
    [],
  )

  const tmpMatrix = useMemo(() => new THREE.Matrix4(), [])
  const tmpQuat = useMemo(() => new THREE.Quaternion(), [])
  const tmpScale = useMemo(() => new THREE.Vector3(1, 1, 1), [])
  const tmpColor = useMemo(() => new THREE.Color(), [])

  useFrame((state, rawDelta) => {
    const mesh = meshRef.current
    const group = groupRef.current
    const core = coreRef.current
    if (!mesh || !group) return

    const delta = Math.min(rawDelta, 1 / 30)
    const elapsed = state.clock.elapsedTime
    const pos = positionRef.current // continuous 0..STATES.length-1
    const stateIndex = Math.floor(pos)
    const localT = pos - stateIndex
    const nextIndex = Math.min(stateIndex + 1, STATE_LAYOUT.length - 1)

    const layoutA = LAYOUTS[STATE_LAYOUT[stateIndex] ?? 'sphere']
    const layoutB = LAYOUTS[STATE_LAYOUT[nextIndex] ?? 'sphere']

    // gentle idle rotation, stronger when coherent (hero/challenge/conclusion), calmer mid-journey
    const coherence = THREE.MathUtils.smoothstep(pos, HERO_INDEX, CHALLENGE_INDEX + 0.6) *
      (1 - THREE.MathUtils.smoothstep(pos, INSIGHT_INDEX - 0.8, INSIGHT_INDEX)) +
      THREE.MathUtils.smoothstep(pos, CONCLUSION_INDEX - 0.4, CONCLUSION_INDEX)
    group.rotation.y += (0.05 + coherence * 0.06) * delta
    group.position.y = Math.sin(elapsed * 0.5) * 0.05 * (1 - Math.min(1, Math.abs(pos - EXECUTION_INDEX)))

    for (let i = 0; i < NODE_COUNT; i++) {
      const a = layoutA[i % layoutA.length]
      const b = layoutB[i % layoutB.length]
      const target = a.clone().lerp(b, THREE.MathUtils.smoothstep(localT, 0, 1))

      const jitterPhase = i * 12.9 + elapsed * 0.6
      const breathe = Math.sin(jitterPhase) * 0.02
      target.x += breathe
      target.z += Math.cos(jitterPhase) * 0.02

      const dampT = 1 - Math.exp(-DAMP_LAMBDA * delta)
      currentPositions[i].lerp(target, dampT)

      tmpQuat.setFromEuler(new THREE.Euler(currentPositions[i].y * 0.3, currentPositions[i].x * 0.3, elapsed * 0.2))
      const scaleBoost = 1 + 0.4 * THREE.MathUtils.smoothstep(pos, INSIGHT_INDEX - 0.5, INSIGHT_INDEX)
      tmpScale.setScalar((0.85 + 0.5 * Math.sin(i * 3.1)) * scaleBoost)
      tmpMatrix.compose(currentPositions[i], tmpQuat, tmpScale)
      mesh.setMatrixAt(i, tmpMatrix)

      const converge = THREE.MathUtils.smoothstep(pos, INSIGHT_INDEX - 0.6, INSIGHT_INDEX)
      const facing = currentPositions[i].z * 0.4 + currentPositions[i].y * 0.15
      tmpColor.copy(COLOR_ROOT).lerp(COLOR_TIP, THREE.MathUtils.clamp(facing + 0.5, 0, 1))
      tmpColor.lerp(COLOR_CONVERGED, converge * 0.85)
      mesh.setColorAt(i, tmpColor)
    }
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true

    // core visibility: strong at hero/challenge/conclusion, hidden mid-journey, reappears bright at insight
    const heroCore = 1 - THREE.MathUtils.smoothstep(pos, CHALLENGE_INDEX + 0.3, CHALLENGE_INDEX + 1)
    const endCore = THREE.MathUtils.smoothstep(pos, CONCLUSION_INDEX - 0.5, CONCLUSION_INDEX)
    const insightCore = THREE.MathUtils.smoothstep(pos, INSIGHT_INDEX - 0.35, INSIGHT_INDEX) *
      (1 - THREE.MathUtils.smoothstep(pos, INSIGHT_INDEX + 0.4, INSIGHT_INDEX + 1))
    const coreVisible = Math.min(1, heroCore + endCore + insightCore * 0.6)
    if (core) {
      const s = 0.55 + coreVisible * 0.5 + insightCore * 0.35
      core.scale.setScalar(s)
      const mat = core.material as THREE.MeshStandardMaterial
      mat.opacity = coreVisible
      mat.transparent = true
      mat.emissive = insightCore > 0.05 ? new THREE.Color('#7c3aed') : new THREE.Color('#000000')
      mat.emissiveIntensity = insightCore * 1.2
    }

    // investigation connecting lines: fade in during investigation, drawn from the shared investigation field positions
    const investigationT = 1 - Math.min(1, Math.abs(pos - (INVESTIGATION_INDEX + 0.5)) / 0.9)
    lineMaterial.opacity = Math.max(0, investigationT) * 0.55
    if (linesRef.current && investigationT > 0.01) {
      const posAttr = lineGeometry.getAttribute('position') as THREE.BufferAttribute
      let ptr = 0
      const revealCount = Math.floor(neighborPairs.length * THREE.MathUtils.clamp((pos - INVESTIGATION_INDEX) * 2.2, 0, 1))
      for (let k = 0; k < neighborPairs.length; k++) {
        const [ia, ib] = neighborPairs[k]
        const visible = k < revealCount
        const pa = visible ? currentPositions[ia] : currentPositions[ia]
        const pb = visible ? currentPositions[ib] : currentPositions[ia]
        posAttr.setXYZ(ptr++, pa.x, pa.y, pa.z)
        posAttr.setXYZ(ptr++, pb.x, pb.y, pb.z)
      }
      posAttr.needsUpdate = true
    }

    // execution flow pulse: subtle brightness sweep left-to-right
    if (Math.abs(pos - EXECUTION_INDEX - 0.5) < 1) {
      material.emissive = new THREE.Color('#4c1d95')
      material.emissiveIntensity = 0.15 + 0.15 * Math.sin(elapsed * 2)
    } else {
      material.emissiveIntensity = 0
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef} geometry={coreGeometry} material={coreMaterial} />
      <instancedMesh ref={meshRef} args={[geometry, material, NODE_COUNT]} />
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
    </group>
  )
}
