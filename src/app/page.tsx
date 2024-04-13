'use client'
import styles from './page.module.css'
import { useState } from 'react'

interface Password {
  id: string
  has: string
  name: string
}

export default function Home () {
  const [passwords, setPasswords] = useState<Password[]>(() => {
    const passStr = localStorage.getItem('passwords')

    if (passStr === null) return []

    return JSON.parse(passStr)
  })

  return (
    <main className={styles.main}>
      <h1>Crypto password</h1>

      <ul>
        {passwords.map(p => <li key={p.id}>
          <strong>{p.name}</strong>
          <p>{p.has}</p>
        </li>)}
      </ul>
    </main>
  )
}
