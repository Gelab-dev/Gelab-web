import { useEffect, useState, useRef } from 'react'

interface Options {
  from: number
  to: number
  duration?: number
  started: boolean
}

export function useCountUp({ from, to, duration = 1500, started }: Options) {
  const [value, setValue] = useState(from)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!started) return

    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    const startTime = performance.now()
    const diff = to - from

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + diff * eased))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [started, from, to, duration])

  return value
}