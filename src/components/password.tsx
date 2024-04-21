import styles from '@/styles/password.module.css'
import { useRef, useState } from 'react'
import requestService from '@/services/request'
import { usePasswordsStore } from '@/stores/passwords-store'
import EyeIcon from '@/icons/eye'
import EyeOffIcon from '@/icons/eye-off'
import TrashIcon from '@/icons/trash'
import EditIcon from '@/icons/edit'
import CopyIcon from '@/icons/copy'
import CopyCheckIcon from '@/icons/copy-check'
import { toast } from 'sonner'
import useTimeout from '@/hooks/timeout'
import DeviceFloppyIcon from '@/icons/device-floppy'

export default function Password ({ password }: {
  password: Password
}) {
  const plainPassword = useRef<string>()
  const nameInput = useRef<HTMLInputElement | null>(null)
  const passwordInput = useRef<HTMLInputElement | null>(null)
  const [removePassword, updatePassword, visiblePasswordId, setVisiblePassword, setHidePassword] = usePasswordsStore(state => [state.removePassword, state.updatePassword, state.visiblePasswordId, state.setVisiblePassword, state.setHidePassword])
  const [copiedPassword, setCopiedPassword] = useState(false)
  const { execution } = useTimeout()
  const [edit, setEdit] = useState(false)
  const [changes, setChanges] = useState(false)

  const showPassword = password.id === visiblePasswordId

  const handlePlainPassword = async () => {
    if (plainPassword.current === undefined) {
      const decrypted = await requestService.decrypt({
        hash: password.hash
      })
      plainPassword.current = decrypted.hash
    }
  }

  const toggleShowPassword = async () => {
    try {
      await handlePlainPassword()

      if (showPassword) {
        setHidePassword()
      } else {
        setVisiblePassword(password.id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const copyPassword = async () => {
    try {
      await handlePlainPassword()
      await navigator.clipboard.writeText(plainPassword.current ?? '')
      setCopiedPassword(true)
      execution(() => {
        setCopiedPassword(false)
      }, 3)
      toast.success(`${password.name} password copied`)
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = async () => {
    try {
      await handlePlainPassword()

      if (edit) {
        if (changes) {
          if (nameInput.current === null || passwordInput.current === null) return
          setChanges(false)
          updatePassword(password.id, {
            name: nameInput.current.value,
            hash: passwordInput.current.value
          })
          setEdit(false)
        } else {
          setEdit(false)
        }
      } else {
        setEdit(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const deletePassword = () => {
    removePassword(password.id)
  }

  const handleChange = () => {
    if (nameInput.current === null || passwordInput.current === null) return
    if (nameInput.current.value === password.name && passwordInput.current.value === plainPassword.current) {
      setChanges(false)
    } else {
      setChanges(true)
    }
  }

  return (
    <li className={styles.card + (edit ? ' ' + styles.edit : '')}>
      {edit
        ? <input ref={nameInput} onChange={handleChange} className={styles.name} type="text" size={password.name.length} defaultValue={password.name} />
        : <h3>{password.name}</h3>
      }
      <section>
        <span>Password</span>
        <div className={styles.password}>
          {edit
            ? <input ref={passwordInput} onChange={handleChange} type={showPassword ? 'text' : 'password'} maxLength={30} defaultValue={plainPassword.current} />
            : <p>{showPassword ? plainPassword.current : '••••••••'}</p>
          }
          <button onClick={toggleShowPassword}>{showPassword ? <EyeIcon /> : <EyeOffIcon />}</button>
        </div>
      </section>
      <div className={styles.buttons}>
        <button onClick={copyPassword}>
          {copiedPassword ? <CopyCheckIcon className={styles.copied} /> : <CopyIcon />}
        </button>
        <button className={styles.editBtn} onClick={handleEdit}>
          {changes
            ? <DeviceFloppyIcon />
            : <EditIcon />}
        </button>
        <button className={styles.deleteBtn} onClick={deletePassword}>
          <TrashIcon />
        </button>
      </div>
    </li>
  )
}
