import { useEffect, useState } from 'react';
import useCategoryContext from '../hooks/useCategoryContext';
import useTaskContext from '../hooks/useTaskContext';

function Categories() {
    const categoryContext = useCategoryContext();
    const taskContext = useTaskContext();
    const [removing, setRemoving] = useState([]); // State to track items being removed
    const removeCategory = (id) => {
        setRemoving([...removing, id]); // Mark the item as being removed
        taskContext.removeTasksByCategoryId(id);
        setTimeout(() => {
            categoryContext.removeCategory(id);
        }, 500);
    };

    const updateActive = (id) => {
        categoryContext.setActiveCategory(id);
    };
    useEffect(() => {
        // set initially on first visit 1st category id
        console.log('initially updated');
        if (
            categoryContext.categories.length > 0 &&
            categoryContext.categories[0].id &&
            !categoryContext.activeCategory
        ) {
            categoryContext.setActiveCategory(categoryContext.categories[0].id);
        }
        if (categoryContext.activeCategory) {
            categoryContext.setActiveCategory(categoryContext.activeCategory);
        }
    }, []);

    return (
        <div className="w-full category-box">
            {categoryContext.categories.length > 0 ? (
                categoryContext.categories.map((ele) => {
                    const isRemoving = removing.includes(ele.id);
                    const className = `category-container  ${ele.id == categoryContext.activeCategory ? 'active' : ''} ${isRemoving ? 'fadeOut' : ''}`; // Apply fade-out if needed
                    const categoryTasks = taskContext.getProgress(ele.id, 'Completed');
                    const tasksLength = taskContext.tasks[ele.id]?.length || 0;
                    // Calculate the completion percentage
                    let completionPercentage = 0;

                    // Ensure the total number of tasks is greater than zero to avoid division by zero
                    if (tasksLength > 0) {
                        completionPercentage = (categoryTasks / tasksLength) * 100;
                    }

                    return (
                        <div className={className} key={ele.id}>
                            <div className="category" onClick={() => updateActive(ele.id)}>
                                <p> {ele.name} </p>
                                <button onClick={() => removeCategory(ele.id)}>
                                    <i className="bx bx-x"></i>
                                </button>
                            </div>
                            <div className="progress">
                                <div className="progress-bar">
                                    <div
                                        className="line"
                                        style={{ width: `${completionPercentage}%` }}
                                    ></div>
                                </div>
                                <div className="count">
                                    {' '}
                                    {categoryTasks} / {tasksLength}{' '}
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="not-found">
                    <h2>No Categories Found</h2>
                </div>
            )}
        </div>
    );
}

export default Categories;
