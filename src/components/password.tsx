import { useRef, useState } from 'react'
import styles from '@/styles/password.module.css'
import requestService from '@/services/request'
import { usePasswordsStore } from '@/stores/passwords-store'

export default function Password ({ password }: {
  password: Password
}) {
  const plainPassword = useRef('')
  const [showPassword, setShowPassword] = useState(false)
  const removePassword = usePasswordsStore(state => state.removePassword)

  const toggleShowPassword = async () => {
    try {
      if (plainPassword.current.length === 0) {
        const decrypted = await requestService.decrypt({
          hash: password.hash
        })
        plainPassword.current = decrypted.hash
      }
      setShowPassword(s => !s)
    } catch (error) {
      console.error(error)
    }
  }

  const copyPassword = async () => {
    try {
      if (plainPassword.current.length === 0) {
        const decrypted = await requestService.decrypt({
          hash: password.hash
        })
        plainPassword.current = decrypted.hash
      }
      await navigator.clipboard.writeText(plainPassword.current)
    } catch (error) {
      console.error(error)
    }
  }

  const deletePassword = () => {
    removePassword(password.id)
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
