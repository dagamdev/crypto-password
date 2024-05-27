import styles from '@/styles/header.module.css'
import LoadPasswords from './load-passwords'

export default function Header () {
  return (
    <header className={styles.header}>
      <h1>Crypto password</h1>
      <LoadPasswords />
    </header>
  )
}
