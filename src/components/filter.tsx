import { useRef, type ChangeEvent } from 'react'

export default function Filter () {
  const timeout = useRef<NodeJS.Timeout>()

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value.trim()

    if (timeout.current !== undefined) {
      clearTimeout(timeout.current)
    }

    timeout.current = setTimeout(() => {
      console.log({ value })
    }, 600)
  }

  return (
    <label>
      Filter by name
      <input onChange={handleChange} type="search" />
    </label>
  )
}
