import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CardContextProvider } from './context/CardContext.jsx'
import { SubtaskContextProvider } from './context/SubTasksCardContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <SubtaskContextProvider>
    <CardContextProvider>
        <App/>
    </CardContextProvider>
  </SubtaskContextProvider>
  </BrowserRouter>
  </React.StrictMode>,
)
