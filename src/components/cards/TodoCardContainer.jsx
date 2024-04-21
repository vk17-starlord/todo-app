
import PropTypes from "prop-types";
import styles from "./card.module.css";
import TodoParentCard from "./TodoParentCard";
import useCardContext from "@/hooks/useCardContext";

function TodoCardContainer({  id , heading, data }) {
  const cardstore = useCardContext();

  const handleDrop = (e) => {
    e.preventDefault();
    const status = e.currentTarget.dataset.status;
    const draggedItemId = cardstore.draggedItemID;
    cardstore.updateCardStatus(draggedItemId,status);
  }

  const handleDragOver = (e) => e.preventDefault()

  return (
    <div className={styles.todo_container} data-status={id} onDrop={handleDrop}
    onDragOver={handleDragOver}>
      <div className={styles.todo_title_container}>
        <h2>{heading}</h2>
        <button>
          <i className="bx bx-plus"></i> Add
        </button>
      </div>

      <div className={styles.todo_cards}>
        {data.length > 0 ? (
          data.map((card, index) => (
            <TodoParentCard id={id} key={`card-${index}`} card={card} />
          ))
        ) : (
          <p>No cards to display</p>
        )}
      </div>
    </div>
  );
}

// Define prop types for the component
TodoCardContainer.propTypes = {
  id:PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired, // Heading must be a string
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired, // Each card must have a name
      description: PropTypes.string.isRequired, // Each card must have a description
    })
  ).isRequired, // Data must be an array of card objects
};

export default TodoCardContainer;
