'use client'

import { type ReactNode, createContext, useRef, useContext, useEffect } from 'react'
import { type StoreApi, useStore } from 'zustand'

import { type PasswordsStore, createPasswordsStore } from '@/stores/passwords-store'

export const PasswordsContext = createContext<StoreApi<PasswordsStore> | null>(null)

export default function PasswordsProvider ({ children }: {
  children: ReactNode
}) {
  const storeRef = useRef<StoreApi<PasswordsStore>>()
  if (storeRef.current === undefined) {
    storeRef.current = createPasswordsStore()
  }

  storeRef.current.subscribe((s, ps) => {
    console.log({ s, ps })
  })

  useEffect(() => {
    console.log('passwords provider')
  }, [])

  return (
    <PasswordsContext.Provider value={storeRef.current}>
      {children}
    </PasswordsContext.Provider>
  )
}

export function usePasswordsStore <T> (selector: (store: PasswordsStore) => T): T {
  const passwordsStoreContext = useContext(PasswordsContext)

  if (passwordsStoreContext === null) {
    throw new Error('usePasswordsStore must be use within CounterStoreProvider')
  }

  return useStore(passwordsStoreContext, selector)
}
