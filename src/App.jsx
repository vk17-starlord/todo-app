import './App.css'
import Dashboard from './pages/home/Dashboard'
import Sidebar from './components/Sidebar'
import { Routes, Route, Navigate } from "react-router-dom"
import Task from './pages/tasks/Task'

function App() {
  return (
    <div className='root'>
      <div className="dashboard">
      <div className="col">
        <Sidebar />
      </div>
      <div className="container">
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="/tasks" element={<Dashboard />} />
        <Route path="/tasks/:id" element={ <Task/> } />
      </Routes>
      </div>
      </div>
    </div>
  )
}

export default App
