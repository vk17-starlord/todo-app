import PropTypes from 'prop-types';
import TodoCard from './TodoCard';
import useTaskContext from '../hooks/useTaskContext';

function TodoBoard({ parentID, tasks, status }) {
    const taskStore = useTaskContext();

    const handleDrop = (e) => {
        e.preventDefault();
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

TodoBoard.propTypes = {
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

export default TodoBoard;