import { useEffect, useState } from 'react'

const POINTER_QUERY = '(pointer: coarse)'
const MOBILE_WIDTH_PX = 768

function computeIsCoarse(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(POINTER_QUERY).matches || window.innerWidth < MOBILE_WIDTH_PX
}

export function useIsCoarsePointer(): boolean {
  const [isCoarse, setIsCoarse] = useState<boolean>(computeIsCoarse)

  useEffect(() => {
    const handleResize = () => setIsCoarse(computeIsCoarse())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isCoarse
}
