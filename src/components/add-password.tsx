import { type FormEvent } from 'react'
import requestService from '@/services/request'
import { usePasswordsStore } from '@/stores/passwords-store'

export default function AddPassword () {
  const [passwords, addPassword] = usePasswordsStore(store => [store.passwords, store.addPassword, store.updatePassword])

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const name = ev.currentTarget.passName.value
    const password = ev.currentTarget.password.value

    if (passwords.some(p => p.name === name)) return

    ev.currentTarget.passName.value = ''
    ev.currentTarget.password.value = ''

    try {
      const encryptedData = await requestService.encrypt<Record<'iv' | 'encrypted', string>>(password)

      addPassword({
        name,
        key: encryptedData.iv,
        hash: encryptedData.encrypted
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
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
  )
}
