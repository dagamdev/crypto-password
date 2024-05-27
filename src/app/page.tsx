'use client'

import PasswordForm from '@/components/add-password'
import { Suspense, useState } from 'react'
import Search from '@/components/search'
import Passwords from '@/components/passwords'
import { usePasswordsStore } from '@/stores/passwords-store'

export default function Home () {
  const passwords = usePasswordsStore(store => store.passwords)

  return (
    <main>
      <PasswordForm />

      <div>
        {passwords.length !== 0 && <Search />}
        <Suspense>
          <Passwords />
        </Suspense>
      </div>

      {''.length !== 0 && <InvertHEXColor />}
    </main>
  )
}

function InvertHEXColor () {
  const [invertedHexColor, setInvertedHexColor] = useState<string>()

  return (
    <>
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
    </>
  )
}
