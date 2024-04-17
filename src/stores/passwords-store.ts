import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'

export interface PasswordsState {
  passwords: Password[]
}

export interface PasswordsActions {
  addPassword: (newPassword: Omit<Password, 'id'>) => void
  removePassword: (passwordId: string) => void
  setPasswords: (passwords: Password[]) => void
  updatePassword: (passwordId: string, newData: Partial<Omit<Password, 'id'>>) => void
}

export type PasswordsStore = PasswordsState & PasswordsActions

export const usePasswordsStore = create<PasswordsStore>()(
  persist((set, get) => ({
    passwords: [],
    addPassword (newPassword) {
      set((state) => ({ passwords: [...state.passwords, { id: crypto.randomUUID(), ...newPassword }] }))
      toast.success('New saved password')
    },
    removePassword (passwordId) {
      set(state => ({ passwords: state.passwords.filter(p => p.id !== passwordId) }))
      toast.success('Deleted password')
    },
    setPasswords (passwords) {
      set({ passwords })
    },
    updatePassword (passwordId, newData) {
      set((state) => ({ passwords: state.passwords.map(p => p.id === passwordId ? { ...p, ...newData } : p) }))
      toast.success('Updated password')
    }
  }), {
    name: 'passwords'
  })
)
