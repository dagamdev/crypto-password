import { createStore } from 'zustand/vanilla'

export interface PasswordsState {
  passwords: Password[]
}

export interface PasswordsActions {
  addPassword: (newPassword: Password) => void
  removePassword: (passwordId: string) => void
  setPasswords: (passwords: Password[]) => void
}

export type PasswordsStore = PasswordsState & PasswordsActions

export const createPasswordsStore = (initState: PasswordsState = { passwords: [] }) => {
  return createStore<PasswordsStore>()((set) => ({
    ...initState,
    addPassword (newPassword) {
      set((state) => ({ passwords: [...state.passwords, newPassword] }))
    },
    removePassword (passwordId) {
      set(state => ({ passwords: state.passwords.filter(p => p.id !== passwordId) }))
    },
    setPasswords (passwords) {
      set(() => ({ passwords }))
    }
  }))
}
