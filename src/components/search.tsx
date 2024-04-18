import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useRef, type ChangeEvent } from 'react'

export default function Search () {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const router = useRouter()
  const timeout = useRef<NodeJS.Timeout>()

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value.trim()

    if (timeout.current !== undefined) {
      clearTimeout(timeout.current)
    }

    timeout.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams)
      console.log({ value })

      if (value.length === 0) {
        params.delete('search')
      } else {
        params.set('search', value)
      }

      router.replace(`${pathName}?${params.toString()}`)
    }, 600)
  }

  return (
    <label>
      Search by name
      <input onChange={handleChange} type="search" defaultValue={searchParams.get('search') ?? undefined} />
    </label>
  )
}
