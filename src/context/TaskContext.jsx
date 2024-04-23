import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the context with initial values for tasks
const TaskContext = createContext({
    tasks: {},
    addTask: () => {},
    removeTask: () => {},
    updateTask: () => {},
    getTasksByCategoryId: () => {},
    getTaskById: () => {}
});

// Local storage key for saving tasks data
const LOCAL_STORAGE_KEY = 'tasks';

// Define the provider component
const TaskContextProvider = ({ children }) => {
    // Load the initial state from local storage
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedTasks ? JSON.parse(storedTasks) : {};
    });

    // Function to add a new task
    const addTask = (categoryId, newTask) => {
        setTasks((prevTasks) => {
            const updatedTasks = {
                ...prevTasks,
                [categoryId]: [...(prevTasks[categoryId] || []), newTask]
            };
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    };

    // Function to remove a task by ID from a specific category
    const removeTask = (categoryId, taskId) => {
        setTasks((prevTasks) => {
            const updatedTasks = {
                ...prevTasks,
                [categoryId]: (prevTasks[categoryId] || []).filter((task) => task.id !== taskId)
            };
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    };

    // Function to update a task's details
    const updateTask = (categoryId, taskId, updatedTask) => {
        setTasks((prevTasks) => {
            const updatedTasks = {
                ...prevTasks,
                [categoryId]: (prevTasks[categoryId] || []).map((task) =>
                    task.id === taskId ? { ...task, ...updatedTask } : task
                )
            };
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    };

    // Function to get all tasks for a specific category ID
    const getTasksByCategoryId = (categoryId) => {
        return tasks[categoryId] || [];
    };

    // Function to get a task by its ID from any category
    const getTaskById = (taskId) => {
        for (const categoryId in tasks) {
            const task = tasks[categoryId].find((t) => t.id === taskId);
            if (task) {
                return task;
            }
        }
        return null;
    };

    // Save tasks to local storage whenever they change
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                removeTask,
                updateTask,
                getTasksByCategoryId,
                getTaskById
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

// Prop validation for the children prop to ensure it's passed correctly
TaskContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export { TaskContext, TaskContextProvider };
