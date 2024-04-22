import { CardContext } from '@/context/CardContext';
import { useContext } from 'react';

// Custom hook for accessing the CardContext
const useCardContext = () => {
    const context = useContext(CardContext); // Use useContext to access the context

    // Check if context is not available (if the hook is used outside the provider)
    if (!context) {
        throw new Error('useCardContext must be used within a CardContextProvider');
    }

    return context; // Return the context
};

export default useCardContext;
