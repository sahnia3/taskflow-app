import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete INSPIRE 1PL3 project', completed: false },
    { id: 2, text: 'Build a React to-do list app', completed: true },
    { id: 3, text: 'Deploy to Vercel', completed: false },
    { id: 4, text: 'Add sample tasks to app', completed: true },
  ])
  const [input, setInput] = useState('')

  const addTask = () => {
    if (input.trim() === '') return
    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    }
    setTasks([...tasks, newTask])
    setInput('')
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length
  const remainingTasks = totalTasks - completedTasks

  return (
    <div className="container">
      <header className="header">
        <h1>TaskFlow</h1>
        <p className="subtitle">Built by Aditya Sahni</p>
      </header>

      <div className="stats">
        <div className="stat">
          <div className="stat-value">{totalTasks}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat">
          <div className="stat-value">{completedTasks}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat">
          <div className="stat-value">{remainingTasks}</div>
          <div className="stat-label">Remaining</div>
        </div>
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="task-input"
        />
        <button onClick={addTask} className="add-btn">
          Add Task
        </button>
      </div>

      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p className="empty-message">No tasks yet. Add one to get started!</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-item">
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="task-checkbox"
                />
                <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
