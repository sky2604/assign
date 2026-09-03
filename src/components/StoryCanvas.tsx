import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import StoryObject from './StoryObject'
import { usePositionRef, STORY_STATES } from '../lib/scrollStory'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const HERO_INDEX = STORY_STATES.indexOf('hero')
const COMPLEXITY_INDEX = STORY_STATES.indexOf('complexity')
const INSIGHT_INDEX = STORY_STATES.indexOf('insight')
const STRATEGY_INDEX = STORY_STATES.indexOf('strategy')
const EXECUTION_INDEX = STORY_STATES.indexOf('execution')
const LEARNING_INDEX = STORY_STATES.indexOf('learning')
const CONCLUSION_INDEX = STORY_STATES.indexOf('conclusion')
const LAST_INDEX = STORY_STATES.length - 1

// camera distance keyframes per state index
const DISTANCE_KEYFRAMES: [number, number][] = [
  [HERO_INDEX, 4.6],
  [COMPLEXITY_INDEX, 8.5],
  [STORY_STATES.indexOf('questions'), 7.4],
  [STORY_STATES.indexOf('investigation'), 7.8],
  [INSIGHT_INDEX, 3.4],
  [STRATEGY_INDEX, 6.6],
  [EXECUTION_INDEX, 7.2],
  [LEARNING_INDEX, 6.4],
  [CONCLUSION_INDEX, 4.6],
]

function sampleKeyframes(pos: number, frames: [number, number][]) {
  if (pos <= frames[0][0]) return frames[0][1]
  for (let i = 0; i < frames.length - 1; i++) {
    const [aPos, aVal] = frames[i]
    const [bPos, bVal] = frames[i + 1]
    if (pos >= aPos && pos <= bPos) {
      const t = bPos === aPos ? 0 : (pos - aPos) / (bPos - aPos)
      return THREE.MathUtils.lerp(aVal, bVal, THREE.MathUtils.smoothstep(t, 0, 1))
    }
  }
  return frames[frames.length - 1][1]
}

function CameraRig({ allowMotion }: { allowMotion: boolean }) {
  const positionRef = usePositionRef()
  const { camera } = useThree()
  const currentDistance = useRef(4.6)
  const currentY = useRef(0.15)

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30)
    const pos = positionRef.current

    const targetDistance = sampleKeyframes(pos, DISTANCE_KEYFRAMES)
    const targetY = 0.15 + Math.sin((pos / LAST_INDEX) * Math.PI) * -0.3

    const lambda = allowMotion ? 3.2 : 12
    currentDistance.current = THREE.MathUtils.damp(currentDistance.current, targetDistance, lambda, delta)
    currentY.current = THREE.MathUtils.damp(currentY.current, targetY, lambda, delta)

    const angle = allowMotion ? pos * 0.22 : 0
    camera.position.set(Math.sin(angle) * currentDistance.current * 0.18, currentY.current, currentDistance.current)
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function StoryCanvas() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const dpr = useMemo<[number, number]>(() => [1, 1.75], [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas dpr={dpr} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0.15, 4.6], fov: 38 }}>
        <ambientLight intensity={0.55} color="#cbb6ff" />
        <directionalLight position={[3.2, 4, 5]} intensity={1.15} color="#ffffff" />
        <directionalLight position={[-4, -1.5, -2.5]} intensity={0.35} color="#7c3aed" />
        <pointLight position={[0, 1.8, 3]} intensity={0.5} color="#e9d5ff" />
        <StoryObject />
        <CameraRig allowMotion={!prefersReducedMotion} />
      </Canvas>
    </div>
  )
}
