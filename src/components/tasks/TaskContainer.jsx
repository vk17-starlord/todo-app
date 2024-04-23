import React from 'react';
import useTaskContext from '../hooks/useTaskContext';

function TaskContainer() {
    const taskContext = useTaskContext();
    const boards = ['Pending', 'Completed', 'Incomplete'];
    const tasks = taskContext.getTasksByCategoryId();

    return <div className="w-full"></div>;
}

export default TaskContainer;
