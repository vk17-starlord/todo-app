import { TaskContext } from '@/context/TaskContext';
import { useContext } from 'react';

// Custom hook for accessing the TaskContext
const useTaskContext = () => {
    const context = useContext(TaskContext); // Use useContext to access the context

    // Check if context is not available (if the hook is used outside the provider)
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskContextProvider');
    }

    return context; // Return the context
};

export default useTaskContext;
