import './App.css'
import Dashboard from './pages/home/Dashboard'
import Sidebar from './components/Sidebar'
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className='root'>
      <div className="dashboard">
      <div className="col">
        <Sidebar />
      </div>
      <div className="container">
      <Routes>
        <Route path="/" element={ <Dashboard/> } />
      </Routes>
      </div>
      </div>
    </div>
  )
}

export default App
