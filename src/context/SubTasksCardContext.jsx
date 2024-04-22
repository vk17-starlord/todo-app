import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the context with initial values for subtasks and functions
const SubtaskContext = createContext({
    subtasks: {},
    addSubtask: () => {},
    removeSubtask: () => {},
    getSubtasksByParentID: () => {},
    updateSubtaskStatus: () => {},
    updateSubtaskName: () => {},
    addsubTasks: () => {},
    dropListID: null,
    draggedItemID: null,
    setDropListID: () => {},
    setDraggedItemID: () => {},
    completedSubTasksByParentID: () => {}
});

// Local storage key for saving subtask data
const SUBTASK_LOCAL_STORAGE_KEY = 'subtask_context_subtasks';

// Define the provider component
const SubtaskContextProvider = ({ children }) => {
    // State to hold the ID of the list where a card is dropped
    const [dropListID, setDropListID] = useState(null);

    // State to hold the ID of the dragged item
    const [draggedItemID, setDraggedItemID] = useState(null);

    // Load the initial state from local storage
    const [subtasks, setSubtasks] = useState(() => {
        const storedSubtasks = localStorage.getItem(SUBTASK_LOCAL_STORAGE_KEY);
        return storedSubtasks ? JSON.parse(storedSubtasks) : {};
    });

    const addsubTasks = (updatedSubtasks) => {
        localStorage.setItem(SUBTASK_LOCAL_STORAGE_KEY, JSON.stringify(updatedSubtasks.subtasks));
        setSubtasks(updatedSubtasks);
    };

    const completedSubTasksByParentID = (id) => {
        const tasks = subtasks[id] ? subtasks[id] : [];
        const completed = tasks.filter((ele) => ele.status == 'Completed');
        return { total: tasks.length, completed: completed.length };
    };

    // Function to add a new subtask to a parent
    const addSubtask = (parentID, newSubtask) => {
        setSubtasks((prevSubtasks) => {
            const updatedSubtasks = { ...prevSubtasks };
            if (!updatedSubtasks[parentID]) {
                updatedSubtasks[parentID] = [];
            }
            updatedSubtasks[parentID].push(newSubtask);
            localStorage.setItem(SUBTASK_LOCAL_STORAGE_KEY, JSON.stringify(updatedSubtasks));
            return updatedSubtasks;
        });
    };

    // Function to remove a subtask by ID and parent ID
    const removeSubtask = (parentID, subtaskID) => {
        setSubtasks((prevSubtasks) => {
            if (!prevSubtasks[parentID]) {
                return prevSubtasks;
            }
            const updatedSubtasks = {
                ...prevSubtasks,
                [parentID]: prevSubtasks[parentID].filter((subtask) => subtask.id !== subtaskID)
            };
            localStorage.setItem(SUBTASK_LOCAL_STORAGE_KEY, JSON.stringify(updatedSubtasks));
            return updatedSubtasks;
        });
    };

    // Function to retrieve subtasks by parent ID
    const getSubtasksByParentID = (parentID) => {
        return subtasks[parentID] ? subtasks[parentID] : [];
    };

    // Function to update a subtask's status by ID
    const updateSubtaskStatus = (parentID, subtaskID, newStatus) => {
        setSubtasks((prevSubtasks) => {
            if (!prevSubtasks[parentID]) {
                return prevSubtasks;
            }
            const updatedSubtasks = {
                ...prevSubtasks,
                [parentID]: prevSubtasks[parentID].map((subtask) =>
                    subtask.id === subtaskID ? { ...subtask, status: newStatus } : subtask
                )
            };
            localStorage.setItem(SUBTASK_LOCAL_STORAGE_KEY, JSON.stringify(updatedSubtasks));
            return updatedSubtasks;
        });
    };

    // Save subtasks to local storage whenever they change
    useEffect(() => {
        localStorage.setItem(SUBTASK_LOCAL_STORAGE_KEY, JSON.stringify(subtasks));
    }, [subtasks]);

    return (
        <SubtaskContext.Provider
            value={{
                subtasks,
                addSubtask,
                removeSubtask,
                getSubtasksByParentID,
                updateSubtaskStatus,
                addsubTasks,
                dropListID,
                setDraggedItemID,
                setDropListID,
                draggedItemID,
                completedSubTasksByParentID
            }}
        >
            {children}
        </SubtaskContext.Provider>
    );
};

// Prop validation for the children prop to ensure it's passed correctly
SubtaskContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export { SubtaskContext, SubtaskContextProvider };
