import PropTypes from 'prop-types';
import styles from "./card.module.css";
import { useRef } from 'react';
import useCardContext from '@/hooks/useCardContext';

function TodoParentCard({ id,card }) {
  const cardstore = useCardContext();
  // Prop validation using PropTypes
  TodoParentCard.propTypes = {
    id:PropTypes.string.isRequired,
    card: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
      created_at: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      progress: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }).isRequired,
  };

  
  // Destructure properties from the validated card prop
  const { name, category, tasks, created_at, progress } = card;

    // Calculate the progress as a percentage
  const progressPercentage = (progress / tasks.length) * 100;

  // Format the date to "23 Jan 2023"
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(created_at));
  const draggingItem = useRef();
  
  const handleDragStart = (e, position) => {
    draggingItem.current = position;
    const dataId = e.target.dataset.itemid;
    cardstore.setDraggedItemID(dataId);
  };

  const handleDragEnter = (e, position) => {
    console.log(position)
    const draggedItemId = cardstore.draggedItemID;
    cardstore.updateCardStatus(draggedItemId,position);
  };

  return (
    <div
    onDragStart={(e) => handleDragStart(e, id)}
    onDragOver={(e) => e.preventDefault()}
    onDragEnter={(e) => handleDragEnter(e, id)}
    key={id}
    data-status={id}
    data-itemid={card.id}
    draggable
    className={styles.todo_card}>
		<h2>{name}</h2>
    <span>{category}</span>
    <div className={styles.progress_container}>
      <h2><i className='bx bx-list-check'></i> Progress </h2>
      <span> { progress } / { tasks.length } </span>
    </div>
    <div className={styles.linebg}>
    <div className={styles.line} style={{ width: `${progressPercentage}%` }}></div>
    </div>
    <div>

    <button className={styles.btn}>
      { formattedDate }
    </button>
    </div>
    </div>
  );
}

export default TodoParentCard;
