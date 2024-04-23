import { CategoryContext } from '@/context/CategoryContext';
import { useContext } from 'react';

// Custom hook for accessing the CategoryContext
const useCategoryContext = () => {
    const context = useContext(CategoryContext); // Use useContext to access the context

    // Check if context is not available (if the hook is used outside the provider)
    if (!context) {
        throw new Error('useCategoryContext must be used within a CategoryContextProvider');
    }

    return context; // Return the context
};

export default useCategoryContext;
