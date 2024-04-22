import useSubTaskContext from '@/hooks/useSubtaskContext';
import PropTypes from 'prop-types';

function TodoCard({ parentID = 0, card = {}, status = '' }) {
    const subtaskStore = useSubTaskContext();

    const handleDragStart = (e) => {
        const id = e.currentTarget.dataset.currentid;
        if (id) {
            subtaskStore.setDraggedItemID(id);
        }
    };

    const removeItem = () => {
        subtaskStore.removeSubtask(parentID, card.id);
    };
    const handleStatusChange = () => {
        let newStatus = '';
        if (status === 'Pending') {
            newStatus = 'Completed';
        } else {
            newStatus = 'Pending';
        }
        subtaskStore.updateSubtaskStatus(parentID, card.id, newStatus);
    };

    return (
        <div
            onDragStart={(e) => handleDragStart(e)}
            onDragOver={(e) => e.preventDefault()}
            draggable
            data-status={status}
            data-currentid={card.id}
            className="todo-card"
        >
            <div className="left">
                <div className="shape" data-status={status} onClick={handleStatusChange}>
                    {status == 'Completed' && <i className="bx bxs-check-circle"></i>}
                    {status == 'Incomplete' && <i className="bx bxs-x-circle"></i>}
                </div>
                <h2 className="todo-name"> {card.name || 'Unnamed Task'}</h2>
            </div>
            <button className="cut" onClick={removeItem}>
                <i className="bx bxs-x-circle"></i>
            </button>
        </div>
    );
}

// PropTypes validation to ensure the card prop is an object with a specific shape
TodoCard.propTypes = {
    parentID: PropTypes.string.isRequired,
    status: PropTypes.string,
    card: PropTypes.shape({
        id: PropTypes.string.isRequired, // The 'id' field is required and must be a string
        name: PropTypes.string // The 'name' field is a string, not required
    })
};

export default TodoCard;
