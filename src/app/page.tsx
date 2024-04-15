'use client'
import styles from '@/styles/page.module.css'
import { useEffect, type FormEvent } from 'react'
import requestService from '@/services/request'
import Password from '@/components/password'
import { usePasswordsStore } from '@/providers/passwords-provider'

export default function Home () {
  const { passwords, setPasswords } = usePasswordsStore(s => s)

  useEffect(() => {
    if (typeof localStorage === 'undefined') return

    const passStr = localStorage.getItem('passwords')

    if (passStr === null) return

    setPasswords(JSON.parse(passStr))
  }, [])

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const name = ev.currentTarget.passName.value
    const password = ev.currentTarget.password.value

    ev.currentTarget.passName.value = ''
    ev.currentTarget.password.value = ''

    try {
      const data = await requestService.encrypt<Record<'iv' | 'encrypted', string>>(password)

      if (typeof localStorage === 'undefined') return

      const updatedPasswords = [...passwords, {
        id: crypto.randomUUID(),
        name,
        key: data.iv,
        hash: data.encrypted
      }]

      setPasswords(updatedPasswords)
      localStorage.setItem('passwords', JSON.stringify(updatedPasswords))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className={styles.main}>
      <h1>Crypto password</h1>

      <form onSubmit={handleSubmit}>
        <h2>Create password</h2>

        <label>
          Name
          <input name='passName' type="text" required />
        </label>
        <label>
          Password
          <input name='password' type="password" required />
        </label>

        <button>Add password</button>
      </form>

      {passwords.length !== 0 && <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
        {passwords.map(p => <Password key={p.id} password={p} />)}
      </ul>}
    </main>
  )
}
