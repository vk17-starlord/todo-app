import PropTypes from 'prop-types';
import TodoCard from './TodoCard';
import useTaskContext from '../hooks/useTaskContext';

function TodoBoard({ categoryID, tasks, status }) {
    const cardStore = useTaskContext();
    console.log(categoryID, tasks, status, 'here');

    const handleDrop = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.dataset, 'container');
        const draggedItemId = cardStore.draggedItemID;
        const status = e.currentTarget.dataset.status;
        const parendID = e.currentTarget.dataset.categoryid;
        console.log(e);
        console.log(draggedItemId, status, parendID, 'here bitch');
        if (parendID && status && draggedItemId) {
            console.log(categoryID, draggedItemId, status);
            cardStore.updateTaskStatus(categoryID, draggedItemId, status);
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    return (
        <div className="w-full">
            <h2 className="todo-heading">{status}</h2>
            <div
                className="w-full todo-container"
                data-status={status}
                data-categoryid={categoryID}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {tasks?.length > 0 ? (
                    tasks.map((ele) => {
                        return (
                            <TodoCard
                                categoryID={categoryID}
                                key={ele.id}
                                status={status}
                                card={ele}
                            />
                        );
                    })
                ) : (
                    <div className="not-found-container">
                        <img
                            className="not-found-box"
                            src="https://cdn.dribbble.com/userupload/2774328/file/original-758f4583933d262698350847b24e44a8.png?resize=1200x900"
                            alt=""
                        />
                        <h2>No Tasks Found 🫣</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

TodoBoard.propTypes = {
    categoryID: PropTypes.string || PropTypes.any,
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

export default TodoBoard;
