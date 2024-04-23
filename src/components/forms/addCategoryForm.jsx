import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Component to input category name and color
const CategoryInputForm = ({ onSubmit }) => {
    // State to track category name and color
    const [categoryName, setCategoryName] = useState('');
    const [categoryColor, setCategoryColor] = useState('#000000'); // Default black

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the onSubmit function with the new category data
        if (categoryName.trim() !== '') {
            onSubmit({ name: categoryName, color: categoryColor });
            // Reset the form
            setCategoryName('');
            setCategoryColor('#000000'); // Default color after submission
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="categoryName">Category Name:</label>
                <input
                    type="text"
                    id="categoryName"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="categoryColor">Category Color:</label>
                <input
                    type="color"
                    id="categoryColor"
                    value={categoryColor}
                    onChange={(e) => setCategoryColor(e.target.value)}
                />
            </div>
            <button type="submit">Add Category</button>
        </form>
    );
};

// Prop validation for the onSubmit function
CategoryInputForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default CategoryInputForm;
