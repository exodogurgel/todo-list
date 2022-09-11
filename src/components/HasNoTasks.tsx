import clipboardImage from '../assets/clipboard.svg';
import styles from './HasNoTasks.module.css';

export function HasNoTasks() {
  return (
    <div className={styles.container}>
      <img src={clipboardImage} alt="imagem de uma prancheta" />
      <p>Você ainda não tem tarefas cadastradas</p>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  )
}