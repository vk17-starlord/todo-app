import './App.css';

import Sidebar from './components/Sidebar';
import Task from './components/tasks/Task';

function App() {
    return (
        <div className="dashboard">
            <div className="col">
                <Sidebar />
            </div>
            <div className="container">
                <Task />
            </div>
        </div>
    );
}

export default App;
