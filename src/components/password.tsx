import { useRef, useState } from 'react'
import styles from '@/styles/password.module.css'
import requestService from '@/services/request'
import { usePasswordsStore } from '@/stores/passwords-store'

export default function Password ({ password }: {
  password: Password
}) {
  const plainPassword = useRef('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwords, setPasswords] = usePasswordsStore(state => [state.passwords, state.setPasswords])

  const toggleShowPassword = async () => {
    try {
      if (plainPassword.current.length === 0) {
        const decrypted = await requestService.decrypt(password.hash, password.key)
        plainPassword.current = decrypted
      }
      setShowPassword(s => !s)
    } catch (error) {
      console.error(error)
    }
  }

  const copyPassword = async () => {
    try {
      if (plainPassword.current.length === 0) {
        const decrypted = await requestService.decrypt(password.hash, password.key)
        plainPassword.current = decrypted
      }
      await navigator.clipboard.writeText(plainPassword.current)
    } catch (error) {
      console.error(error)
    }
  }

  const deletePassword = () => {
    const updatedPasswords = passwords.filter(f => f.id !== password.id)
    setPasswords(updatedPasswords)
  }

  return (
    <li className={styles.password}>
      <strong>{password.name}</strong>
      <input type={showPassword ? 'text' : 'password'} value={showPassword ? plainPassword.current : 'password'} disabled />
      <button onClick={toggleShowPassword}>{showPassword ? 'Hide' : 'Show'}</button>
      <button onClick={copyPassword}>Copy</button>
      <button onClick={deletePassword}>Delete</button>
    </li>
  )
}
