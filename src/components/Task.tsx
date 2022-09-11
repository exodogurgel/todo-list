import { Trash } from "phosphor-react";
import styles from './Task.module.css';

interface Task {
  id: string;
  content: string;
  isComplete: boolean;
}

interface TaskProps {
  task: Task;
  handleToggleTaskCompletion: () => void;
  handleRemoveTask: () => void;
}

export function Task({ task, handleToggleTaskCompletion, handleRemoveTask }: TaskProps) {
  return (
    <div className={styles.container}>
      <input 
        type="checkbox"
        readOnly
        checked={task.isComplete} 
        onClick={handleToggleTaskCompletion}
      />
      <p className={task.isComplete ? styles.isComplete : ''}>{task.content}</p>
      <button
        type="button"
        onClick={handleRemoveTask}
      >
        <Trash size={18} />
      </button>
    </div>
  )
}