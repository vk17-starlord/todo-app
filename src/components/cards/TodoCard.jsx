import useSubTaskContext from "@/hooks/useSubtaskContext";
import PropTypes from "prop-types";

function TodoCard({ card = {}, status = "" }) {
  const subtaskStore = useSubTaskContext();

  const handleDragStart = (e) => {
    const id = e.currentTarget.dataset.currentid;
    if (id) {
      subtaskStore.setDraggedItemID(id);
    }
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
      <div className="shape" data-status={status}>
        {status == "Completed" && <i className="bx bxs-check-circle"></i>}
		{status == "Incomplete" && <i className="bx bxs-x-circle"></i>}
      </div>
      <h2 className="todo-name"> {card.name || "Unnamed Task"}</h2>
    </div>
  );
}

// PropTypes validation to ensure the card prop is an object with a specific shape
TodoCard.propTypes = {
  status: PropTypes.string,
  card: PropTypes.shape({
    id: PropTypes.string.isRequired, // The 'id' field is required and must be a string
    name: PropTypes.string, // The 'name' field is a string, not required
  }),
};

export default TodoCard;
