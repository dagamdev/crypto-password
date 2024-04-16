'use client'
import styles from '@/styles/page.module.css'
import Password from '@/components/password'
import { usePasswordsStore } from '@/stores/passwords-store'
import LoadPasswords from '@/components/load-passwords'
import PasswordForm from '@/components/add-password'
import { useState } from 'react'

export default function Home () {
  const passwords = usePasswordsStore(state => state.passwords)
  const [invertedHexColor, setInvertedHexColor] = useState<string>()

  return (
    <main className={styles.main}>
      <h1>Crypto password</h1>

      <LoadPasswords />
      <PasswordForm />

      {passwords.length !== 0 && <>
        <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
          {passwords.map(p => <Password key={p.id} password={p} />)}
        </ul>
        <a href={'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(passwords))} download={'passwords-backup.json'}>Download backup</a>
      </>}

      <label>
        Inver HEX color
        <input onChange={(ev) => {
          const codigoHex = ev.currentTarget.value.replace('#', '')
          if (codigoHex.length === 0) {
            setInvertedHexColor(undefined)
            return
          }

          const decimal = parseInt(codigoHex, 16)
          console.log({ decimal })

          const componenteR = 255 - (decimal >> 16 & 255)
          const componenteG = 255 - (decimal >> 8 & 255)
          const componenteB = 255 - (decimal & 255)

          const colorComplementario = '#' + ((componenteR << 16) + (componenteG << 8) + componenteB).toString(16).padStart(6, '0')

          setInvertedHexColor(colorComplementario)
        }} type="text" />
      </label>
      {invertedHexColor !== undefined && <p onClick={async () => {
        await navigator.clipboard.writeText(invertedHexColor)
      }}>{invertedHexColor}</p>}
    </main>
  )
}
