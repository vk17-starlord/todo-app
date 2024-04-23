import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the context with initial values for categories
const CategoryContext = createContext({
    categories: [],
    addCategory: () => {},
    removeCategory: () => {},
    updateCategory: () => {},
    getCategoryById: () => {},
    addCategories: () => {}
});

// Local storage key for saving category data
const LOCAL_STORAGE_KEY = 'category_context_categories';

// Define the provider component
const CategoryContextProvider = ({ children }) => {
    // Load the initial state from local storage
    const [categories, setCategories] = useState(() => {
        const storedCategories = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedCategories ? JSON.parse(storedCategories) : [];
    });

    // Function to add a new categories
    const addCategories = (newCategories) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCategories));
        setCategories(newCategories);
    };

    // Function to add a new category
    const addCategory = (newCategory) => {
        setCategories((prevCategories) => {
            const updatedCategories = [...prevCategories, newCategory];
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCategories));
            return updatedCategories;
        });
    };

    // Function to remove a category by ID
    const removeCategory = (categoryId) => {
        setCategories((prevCategories) => {
            const updatedCategories = prevCategories.filter(
                (category) => category.id !== categoryId
            );
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCategories));
            return updatedCategories;
        });
    };

    // Function to update a category's details by ID
    const updateCategory = (categoryId, updatedCategory) => {
        setCategories((prevCategories) => {
            const updatedCategories = prevCategories.map((category) =>
                category.id === categoryId ? { ...category, ...updatedCategory } : category
            );
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCategories));
            return updatedCategories;
        });
    };

    // Function to get a category by ID
    const getCategoryById = (categoryId) => {
        return categories.find((category) => category.id === categoryId);
    };

    // Save categories to local storage whenever they change
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories));
    }, [categories]);

    return (
        <CategoryContext.Provider
            value={{
                categories,
                addCategory,
                removeCategory,
                updateCategory,
                addCategories,
                getCategoryById
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

// Prop validation for the children prop to ensure it's passed correctly
CategoryContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export { CategoryContext, CategoryContextProvider };
