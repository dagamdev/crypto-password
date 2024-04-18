import { usePasswordsStore } from '@/stores/passwords-store'
import Password from './password'
import { useSearchParams } from 'next/navigation'

export default function Passwords () {
  const searchParams = useSearchParams()
  const passwords = usePasswordsStore(store => store.passwords)

  if (passwords.length === 0) return null

  const search = searchParams.get('search')

  return (
    <>
      <h2>Passwords: {passwords.length}</h2>
      <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
        {passwords.filter(p => p.name.toLowerCase().includes(search?.toLowerCase() ?? '')).map(p => <Password key={p.id} password={p} />)}
      </ul>
      <a className='button' href={'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(passwords))} download={'passwords-backup.json'}>Download backup</a>
    </>
  )
}
