'use client'

import { Suspense, useState } from 'react'
import Search from '@/components/search'
import Passwords from '@/components/passwords'
import { usePasswordsStore } from '@/stores/passwords-store'
import Link from 'next/link'

export default function Home () {
  const passwords = usePasswordsStore(store => store.passwords)

  return (
    <>
        {passwords.length !== 0
          ? <Search />
          : <div className='first-message'>
            <p>Aun no tienes passwords, create your first password</p>
            <Link className='button' href='/create/password'>Create password</Link>
          </div>
        }
        <Suspense>
          <Passwords />
        </Suspense>

      {''.length !== 0 && <InvertHEXColor />}
    </>
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
