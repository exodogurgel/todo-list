import logoImage from '../assets/logo.svg';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.container}>
      <img src={logoImage} alt="imagem de um ícone de foguete" />
    </header>
  )
}