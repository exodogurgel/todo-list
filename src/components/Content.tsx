import { v4 as uuidv4 } from 'uuid';
import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './Content.module.css';
import { HasNoTasks } from './HasNoTasks';
import { Task } from './Task';

interface TaskProps {
  id: string;
  content: string;
  isComplete: boolean;
}

export function Content() {
  const [tasks, setTasks] = useState<TaskProps[]>(() => {
    const storageTasks = localStorage.getItem('@todo:tasks');

    if (storageTasks) {
      return JSON.parse(storageTasks);
    }

    return [];
  });
  
  const [newTaskContent, setNewTaskContent] = useState("");

  function handleNewTask() {
    const newTask = {
      id: uuidv4(),
      content: newTaskContent,
      isComplete: false
    }

    setTasks(prevState => [...prevState, newTask])
    setNewTaskContent('');
  };

  function handleNewTaskContent(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskContent(event.target.value)
  };

  function handleToggleTaskCompletion(id: string) {
    const updatedTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task)

    setTasks(updatedTasks);
  };

  function handleRemoveTask(id: string) {
    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks);
  };

  const completedTasks = `${tasks.filter(task => task.isComplete).length} de ${tasks.length}`;

  const isNewTaskContentEmpty = newTaskContent.length === 0;

  useEffect(() => {
    localStorage.setItem('@todo:tasks', JSON.stringify(tasks));
  }, [tasks])
      
  return (
    <div className={styles.content}>
      <section className={styles.inputWrapper}>
        <input 
          type="text" 
          placeholder="Adicione uma nova tarefa"
          value={newTaskContent}
          onChange={handleNewTaskContent}
        />
        <button
          type="button"
          disabled={isNewTaskContentEmpty}
          onClick={handleNewTask}
        >
          Criar
          <PlusCircle weight="bold" size={18}/>
        </button>
      </section>

      <main>
        <header className={styles.headerTasks}>
          <strong>
            Tarefas Criadas 
            <span>{tasks.length}</span>
          </strong>

          <strong>
            Concluídas
            <span>{tasks.length === 0 ? 0 : completedTasks}</span>
          </strong>
        </header>
        {tasks.length === 0 ? (
          <HasNoTasks />
        ):  
          (<div className={styles.sectionTasks}>
            {tasks.map(task => {
              return (
                <Task 
                  key={task.id} 
                  task={task}
                  handleToggleTaskCompletion={() => handleToggleTaskCompletion(task.id)}
                  handleRemoveTask={() => handleRemoveTask(task.id)}
                />
              )
            })}
          </div>)
        }
      </main>
    </div>
  )
}