import { create } from 'zustand'
import { toast } from 'sonner'
import dbService from '@/services/db'

export interface PasswordsState {
  passwords: Password[]
}

export interface PasswordsActions {
  addPassword: (initData: Omit<Password, 'id'>) => void
  removePassword: (passwordId: string) => void
  setPasswords: (passwords: Password[]) => void
  updatePassword: (passwordId: string, newData: Partial<Omit<Password, 'id'>>) => void
}

export type PasswordsStore = PasswordsState & PasswordsActions

export const usePasswordsStore = create<PasswordsStore>()((set, get) => {
  dbService.getPasswords().then(pas => {
    if ('error' in pas) {
      console.error(pas)
    } else {
      set({ passwords: pas })
    }
  }).catch(console.error)

  return {
    passwords: [],
    async addPassword (initData) {
      const newPassword = await dbService.createPassword(initData)

      if ('error' in newPassword) {
        toast.error(newPassword.error)
        return
      }

      set((state) => ({ passwords: [...state.passwords, newPassword] }))
      toast.success('New saved password')
    },
    async removePassword (passwordId) {
      await dbService.deletePassword(passwordId)
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
  }
})
