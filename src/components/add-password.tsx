import { type ChangeEvent, type Dispatch, type SetStateAction, useState, type FormEvent } from 'react'
import { usePasswordsStore } from '@/stores/passwords-store'

export default function AddPassword () {
  const [showForm, setShowForm] = useState(false)
  const [passwords, addPassword] = usePasswordsStore(store => [store.passwords, store.addPassword, store.updatePassword])
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    if (passwords.some(p => p.name === name)) return

    try {
      addPassword({
        name,
        hash: password
      })
      setName('')
      setPassword('')
    } catch (error) {
      console.error(error)
    }
  }

  const toggleShow = () => {
    setShowForm(sf => !sf)
  }

  const getHandleChange = (setState: Dispatch<SetStateAction<string>>) => {
    return (ev: ChangeEvent<HTMLInputElement>) => {
      setState(ev.target.value.trim())
    }
  }

  return (
    <>
    {showForm && <form onSubmit={handleSubmit}>
      <h2>Create password</h2>

      <label>
        Name
        <input onChange={getHandleChange(setName)} name='passName' type="text" value={name} required />
      </label>
      <label>
        Password
        <input onChange={getHandleChange(setPassword)} name='password' type="password" value={password} required />
      </label>

      <button>Save password</button>
    </form>}
    <button onClick={toggleShow}>{showForm ? 'Cancel' : 'Add password'}</button>
    </>
  )
}
