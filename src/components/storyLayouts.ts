import * as THREE from 'three'

export const NODE_COUNT = 168
const SPHERE_RADIUS = 1.7

function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = goldenAngle * i
    points.push(new THREE.Vector3(Math.cos(theta) * radiusAtY * radius, y * radius, Math.sin(theta) * radiusAtY * radius))
  }
  return points
}

/** Deterministic pseudo-random, stable across renders (no Math.random jitter per frame). */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

export function sphereLayout(count = NODE_COUNT): THREE.Vector3[] {
  return fibonacciSphere(count, SPHERE_RADIUS)
}

/** Complexity: particles cluster into N loose fragment groups scattered around, representing fragmenting stakeholders/industries. */
export function fragmentLayout(count = NODE_COUNT): THREE.Vector3[] {
  const groupCount = 6
  const groupCenters: THREE.Vector3[] = []
  for (let g = 0; g < groupCount; g++) {
    const angle = (g / groupCount) * Math.PI * 2
    const radius = 3.6
    const height = (seeded(g, 3) - 0.5) * 2.4
    groupCenters.push(new THREE.Vector3(Math.cos(angle) * radius, height, Math.sin(angle) * radius * 0.7 - 0.4))
  }
  const points: THREE.Vector3[] = []
  for (let i = 0; i < count; i++) {
    const g = i % groupCount
    const center = groupCenters[g]
    const jitterR = 0.75
    const a = seeded(i, 1) * Math.PI * 2
    const b = seeded(i, 2) * Math.PI
    const r = jitterR * (0.35 + 0.65 * seeded(i, 4))
    points.push(
      new THREE.Vector3(
        center.x + Math.cos(a) * Math.sin(b) * r,
        center.y + Math.cos(b) * r,
        center.z + Math.sin(a) * Math.sin(b) * r,
      ),
    )
  }
  return points
}

/** Questions / Investigation: an explorable, roughly even scattered field in front of the camera. */
export function nodeFieldLayout(count = NODE_COUNT): THREE.Vector3[] {
  const points: THREE.Vector3[] = []
  const cols = Math.ceil(Math.sqrt(count * 1.6))
  const rows = Math.ceil(count / cols)
  let i = 0
  for (let r = 0; r < rows && i < count; r++) {
    for (let c = 0; c < cols && i < count; c++) {
      const nx = (c / (cols - 1) - 0.5) * 7.2
      const ny = (r / (rows - 1) - 0.5) * 4.2
      const jitterX = (seeded(i, 5) - 0.5) * 0.5
      const jitterY = (seeded(i, 6) - 0.5) * 0.5
      const jitterZ = (seeded(i, 7) - 0.5) * 1.6
      points.push(new THREE.Vector3(nx + jitterX, ny + jitterY, jitterZ))
      i++
    }
  }
  while (points.length < count) points.push(points[points.length % Math.max(1, points.length)]?.clone() ?? new THREE.Vector3())
  return points
}

/** Insight: everything pulled into a tight, dense, glowing core. */
export function convergedLayout(count = NODE_COUNT): THREE.Vector3[] {
  const points: THREE.Vector3[] = []
  for (let i = 0; i < count; i++) {
    const r = 0.42 * Math.cbrt(seeded(i, 9))
    const a = seeded(i, 10) * Math.PI * 2
    const b = seeded(i, 11) * Math.PI
    points.push(new THREE.Vector3(Math.cos(a) * Math.sin(b) * r, Math.cos(b) * r, Math.sin(a) * Math.sin(b) * r))
  }
  return points
}

/** Strategy: reorganized into a structured layered-ring architecture (Insight -> Decision -> Strategy -> Action). */
export function architectureLayout(count = NODE_COUNT): THREE.Vector3[] {
  const rings = 4
  const perRing = Math.ceil(count / rings)
  const points: THREE.Vector3[] = []
  for (let i = 0; i < count; i++) {
    const ring = Math.floor(i / perRing)
    const idxInRing = i % perRing
    const radius = 0.9 + ring * 0.85
    const angle = (idxInRing / perRing) * Math.PI * 2 + ring * 0.35
    const y = (ring - (rings - 1) / 2) * 0.55
    points.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius))
  }
  return points
}

/** Execution: an operational left-to-right flow pipeline. */
export function flowLayout(count = NODE_COUNT): THREE.Vector3[] {
  const points: THREE.Vector3[] = []
  const stages = 7
  const perStage = Math.ceil(count / stages)
  for (let i = 0; i < count; i++) {
    const stage = Math.floor(i / perStage)
    const idxInStage = i % perStage
    const x = (stage / (stages - 1) - 0.5) * 7.6
    const clusterAngle = (idxInStage / perStage) * Math.PI * 2
    const clusterR = 0.32 + 0.18 * seeded(i, 13)
    const y = Math.sin(clusterAngle) * clusterR + Math.sin(stage * 1.4) * 0.25
    const z = Math.cos(clusterAngle) * clusterR
    points.push(new THREE.Vector3(x, y, z))
  }
  return points
}

/** Learning: the flow bends into a continuous feedback loop (torus). */
export function loopLayout(count = NODE_COUNT): THREE.Vector3[] {
  const points: THREE.Vector3[] = []
  const majorR = 2.1
  const minorR = 0.55
  for (let i = 0; i < count; i++) {
    const u = (i / count) * Math.PI * 2
    const v = seeded(i, 15) * Math.PI * 2
    points.push(
      new THREE.Vector3(
        (majorR + minorR * Math.cos(v)) * Math.cos(u),
        minorR * Math.sin(v),
        (majorR + minorR * Math.cos(v)) * Math.sin(u) * 0.55,
      ),
    )
  }
  return points
}

export type LayoutName =
  | 'sphere'
  | 'fragment'
  | 'nodeField'
  | 'converged'
  | 'architecture'
  | 'flow'
  | 'loop'

export const LAYOUTS: Record<LayoutName, THREE.Vector3[]> = {
  sphere: sphereLayout(),
  fragment: fragmentLayout(),
  nodeField: nodeFieldLayout(),
  converged: convergedLayout(),
  architecture: architectureLayout(),
  flow: flowLayout(),
  loop: loopLayout(),
}

/** State index (matches STORY_STATES order) -> layout name. Investigation reuses nodeField positions (connections are drawn separately). */
export const STATE_LAYOUT: LayoutName[] = [
  'sphere', // hero
  'sphere', // challenge
  'fragment', // complexity
  'nodeField', // questions
  'nodeField', // investigation
  'converged', // insight
  'architecture', // strategy
  'flow', // execution
  'loop', // learning
  'sphere', // conclusion
]
