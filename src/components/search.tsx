import useTimeout from '@/hooks/timeout'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { type ChangeEvent } from 'react'

export default function Search () {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const router = useRouter()
  const { execution } = useTimeout()

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value.trim()

    execution(() => {
      const params = new URLSearchParams(searchParams)

      if (value.length === 0) {
        params.delete('search')
      } else {
        params.set('search', value)
      }

      router.replace(`${pathName}?${params.toString()}`)
    }, 0.6)
  }

  return (
    <label>
      Search by name
      <input onChange={handleChange} type="search" defaultValue={searchParams.get('search') ?? undefined} />
    </label>
  )
}
