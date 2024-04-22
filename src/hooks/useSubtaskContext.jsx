import { SubtaskContext } from '@/context/SubTasksCardContext';
import { useContext } from 'react';

// Custom hook for accessing the CardContext
const useSubTaskContext = () => {
    const context = useContext(SubtaskContext); // Use useContext to access the context

    // Check if context is not available (if the hook is used outside the provider)
    if (!context) {
        throw new Error('useSubTaskContext must be used within a SubTaskContextProvider');
    }

    return context; // Return the context
};

export default useSubTaskContext;
