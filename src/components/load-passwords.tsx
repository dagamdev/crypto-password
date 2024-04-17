import { usePasswordsStore } from '@/stores/passwords-store'
import { type ChangeEvent } from 'react'
import { toast } from 'sonner'

export default function LoadPasswords () {
  const setPasswords = usePasswordsStore(store => store.setPasswords)

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0]
    const reader = new FileReader()

    if (file === undefined) return

    reader.onload = (ev) => {
      const content = ev.target?.result

      if (typeof content !== 'string') return

      setPasswords(JSON.parse(content))
      toast.success('Passwords uploaded by backup file')
    }

    reader.readAsText(file)
    ev.target.value = ''
  }

  return (
    <label>
      Load backup passwords
      <input onChange={handleChange} type="file" accept=".json" id="backupPasswordsInput" />
    </label>
  )
}
