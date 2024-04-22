import PropTypes from 'prop-types';
import TodoCard from './TodoCard';
import useSubTaskContext from '@/hooks/useSubtaskContext';

function TodoCardContainer({ parentID, tasks, status }) {
    const cardStore = useSubTaskContext();

    const handleDrop = (e) => {
        e.preventDefault();
        const draggedItemId = cardStore.draggedItemID;
        const status = e.currentTarget.dataset.status;
        const parendID = e.currentTarget.dataset.parentid;
        if (parendID && status && draggedItemId) {
            cardStore.updateSubtaskStatus(parentID, draggedItemId, status);
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    return (
        <div className="w-full">
            <h2 className="todo-heading">{status}</h2>
            <div
                className="w-full todo-container"
                data-status={status}
                data-parentid={parentID}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {tasks.map((ele) => {
                    return <TodoCard parentID={parentID} key={ele.id} status={status} card={ele} />;
                })}
            </div>
        </div>
    );
}

TodoCardContainer.propTypes = {
    parentID: PropTypes.string.isRequired,
    // tasks should be an array, with each item being an object with at least an 'id' and a 'status'
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired
        })
    ).isRequired,
    // status should be a string
    status: PropTypes.string.isRequired
};

export default TodoCardContainer;
