import { useRef } from 'react'

export default function useTimeout () {
  const timeout = useRef<NodeJS.Timeout>()

  return {
    execution (callback: () => void, time = 5) {
      if (timeout.current !== undefined) clearTimeout(timeout.current)
      timeout.current = setTimeout(callback, time * 1000)
    }
  }
}
