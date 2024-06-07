import styles from '@/styles/header.module.css'
import LoadPasswords from './load-passwords'

export default function Header () {
  return (
    <header className={styles.header}>
      <a className={styles.title} href='/'>Crypto password</a>
      <LoadPasswords />
    </header>
  )
}
