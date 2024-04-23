import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CategoryContextProvider } from './context/CategoryContext.jsx';
import { TaskContextProvider } from './context/TaskContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <CategoryContextProvider>
                <TaskContextProvider>
                    <App />
                </TaskContextProvider>
            </CategoryContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
