import PropTypes from 'prop-types';
import useTaskContext from '../hooks/useTaskContext';
import { useState } from 'react';

function TodoCard({ categoryID = 0, card = {}, status = '', openEditForm }) {
    const [removing, setRemoving] = useState(false); // State to track items being removed
    const taskStore = useTaskContext();
    const handleDragStart = (e) => {
        const id = e.currentTarget.dataset.currentid;
        if (id) {
            console.log(id);
            taskStore.setDraggedItemID(id);
        }
    };

    const editItem = () => {
        openEditForm(card);
    };

    const removeItem = () => {
        setRemoving(true); // Mark the item as being removed
        setTimeout(() => {
            taskStore.removeTask(categoryID, card.id);
        }, 500);
    };
    const handleStatusChange = () => {
        let newStatus = '';
        if (status === 'Pending') {
            newStatus = 'Completed';
        } else {
            newStatus = 'Pending';
        }
        taskStore.updateTaskStatus(categoryID, card.id, newStatus);
    };

    return (
        <div
            className="w-full"
            onDragStart={(e) => handleDragStart(e)}
            onDragOver={(e) => e.preventDefault()}
            draggable
            data-status={status}
            data-currentid={card.id}
        >
            <div className={`todo-card ${removing ? 'remove' : ''}`}>
                <div className="left">
                    <div className="shape" data-status={status} onClick={handleStatusChange}>
                        {status == 'Completed' && <i className="bx bxs-check-circle"></i>}
                        {status == 'Incomplete' && <i className="bx bxs-x-circle"></i>}
                    </div>
                    <h2 className="todo-name"> {card.title || 'Unnamed Task'}</h2>
                </div>
                <div className="right">
                    <button className="edit" onClick={editItem}>
                        <i className="bx bxs-edit-alt"></i>
                    </button>
                    <button className="cut" onClick={removeItem}>
                        <i className="bx bx-x"></i>
                    </button>
                </div>
            </div>
            <div className="tag-container">
                {card.tags.map((ele) => {
                    return (
                        <div className="tag" key={ele}>
                            {ele}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// PropTypes validation to ensure the card prop is an object with a specific shape
TodoCard.propTypes = {
    openEditForm: PropTypes.func.isRequired,
    categoryID: PropTypes.string,
    status: PropTypes.string,
    card: PropTypes.shape({
        id: PropTypes.string.isRequired, // The 'id' field is required and must be a string
        name: PropTypes.string // The 'name' field is a string, not required
    })
};

export default TodoCard;
