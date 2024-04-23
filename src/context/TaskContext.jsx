import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the context with initial values for tasks
const TaskContext = createContext({
    tasks: {},
    addTask: () => {},
    removeTask: () => {},
    updateTask: () => {},
    getTasksByCategoryId: () => {},
    getTaskById: () => {},
    dropListID: null,
    draggedItemID: null,
    setDropListID: () => {},
    setDraggedItemID: () => {},
    updateTaskStatus: () => {},
    getProgress: () => {},
    removeTasksByCategoryId: () => {}
});

// Local storage key for saving tasks data
const LOCAL_STORAGE_KEY = 'tasks';

// Define the provider component
const TaskContextProvider = ({ children }) => {
    // State to hold the ID of the list where a card is dropped
    const [dropListID, setDropListID] = useState(null);

    // State to hold the ID of the dragged item
    const [draggedItemID, setDraggedItemID] = useState(null);

    // Load the initial state from local storage
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedTasks ? JSON.parse(storedTasks) : {};
    });

    // Function to remove all tasks by category ID
    const removeTasksByCategoryId = (categoryId) => {
        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };
            delete updatedTasks[categoryId]; // Remove the category and its tasks
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks)); // Save the updated tasks
            return updatedTasks; // Return the new state
        });
    };

    const addTasks = (tasks) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
        setTasks(tasks);
    };
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

    // Function to update a task's status by its ID and category ID
    const updateTaskStatus = (categoryId, taskId, newStatus) => {
        setTasks((prevTasks) => {
            const updatedTasks = {
                ...prevTasks,
                [categoryId]: (prevTasks[categoryId] || []).map(
                    (task) =>
                        task.id === taskId
                            ? { ...task, status: newStatus } // Update the status
                            : task // Keep other tasks unchanged
                )
            };
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks)); // Save the updated tasks
            return updatedTasks; // Return the new state
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

    const getTasksByCategoryId = (categoryId) => {
        // If the specified category ID exists, return the tasks for that category
        if (tasks[categoryId]) {
            return tasks[categoryId];
        }

        // If the specified category ID does not exist, collect all tasks from every category
        let allTasks = [];
        for (const catId in tasks) {
            allTasks = [...allTasks, ...tasks[catId]]; // Append all tasks to the allTasks array
        }

        return allTasks; // Return the collection of all tasks
    };

    const getProgress = (categoryId, status) => {
        if (tasks[categoryId]) {
            // Use filter to get only the tasks with the specified status
            const statusTasks = tasks[categoryId].filter((task) => task.status === status);
            return statusTasks.length; // Return the count of tasks with the specified status
        }
        return 0; // Return zero if there are no tasks in the specified category
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
                addTasks,
                getTasksByCategoryId,
                getTaskById,
                dropListID,
                setDraggedItemID,
                setDropListID,
                draggedItemID,
                getProgress,
                updateTaskStatus,
                removeTasksByCategoryId
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
