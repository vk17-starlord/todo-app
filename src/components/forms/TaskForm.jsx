import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useCategoryContext from '../hooks/useCategoryContext';

const TaskForm = ({ task, onSubmit, onEdit }) => {
    const { categories } = useCategoryContext(); // Retrieve categories from the context

    // State to hold form input data
    const [taskName, setTaskName] = useState('');
    const [taskTime, setTaskTime] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [taskTags, setTaskTags] = useState(''); // State for tags input

    // Effect to update form data when editing a task
    useEffect(() => {
        if (task) {
            setTaskName(task.title);
            setTaskTime(task.time);
            setTaskCategory(task.category);
            setTaskTags(task.tags.join(', ')); // Join tags with commas
        } else {
            // Clear the form when there's no task
            setTaskName('');
            setTaskTime('');
            setTaskCategory('');
            setTaskTags('');
        }
    }, [task]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form from reloading the page

        if (taskName && taskTime && taskCategory) {
            const tagsArray = taskTags.split(',').map((tag) => tag.trim()); // Split and trim tags

            if (task) {
                // If task prop is provided, it's edit mode
                onEdit({
                    ...task,
                    title: taskName,
                    time: taskTime,
                    category: taskCategory,
                    tags: tagsArray
                });
            } else {
                // Otherwise, it's add mode
                onSubmit({
                    title: taskName,
                    time: taskTime,
                    category: taskCategory,
                    tags: tagsArray
                });
            }

            // Clear the form fields if it's add mode
            if (!task) {
                setTaskName('');
                setTaskTime('');
                setTaskCategory('');
                setTaskTags('');
            }
        }
    };

    return (
        <div className="task-form-container">
            <form className="task-form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="taskName">Task Name:</label>
                    <input
                        type="text"
                        id="taskName"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="taskTime">Task Time:</label>
                    <input
                        type="time"
                        id="taskTime"
                        value={taskTime}
                        onChange={(e) => setTaskTime(e.target.value)}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="taskCategory">Task Category:</label>
                    <select
                        id="taskCategory"
                        value={taskCategory}
                        onChange={(e) => setTaskCategory(e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="input-container">
                    <label htmlFor="taskTags">Task Tags:</label>
                    <input
                        type="text"
                        id="taskTags"
                        value={taskTags}
                        onChange={(e) => setTaskTags(e.target.value)}
                        placeholder="Enter tags separated by commas (e.g., Important, Priority)"
                    />
                </div>

                <button className="btn" type="submit">
                    {task ? 'Edit Task' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

TaskForm.propTypes = {
    onSubmit: PropTypes.func.isRequired, // Function to call on form submit for new tasks
    onEdit: PropTypes.func, // Optional function to call when editing a task
    task: PropTypes.object // Optional task prop for edit mode
};

export default TaskForm;
