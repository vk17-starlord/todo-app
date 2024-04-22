import PropTypes from 'prop-types';
import styles from './card.module.css';
import { NavLink } from 'react-router-dom';
import useSubTaskContext from '@/hooks/useSubtaskContext';

function TodoParentCard({ id, card }) {
    // Prop validation using PropTypes
    TodoParentCard.propTypes = {
        id: PropTypes.string.isRequired,
        card: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            subtasks: PropTypes.arrayOf(PropTypes.string).isRequired,
            tags: PropTypes.arrayOf(PropTypes.string).isRequired,
            created_at: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            progress: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired
        }).isRequired
    };

    // Destructure properties from the validated card prop
    const { name, category, created_at } = card;
    const SubtaskContext = useSubTaskContext();
    const totalProgress = SubtaskContext.completedSubTasksByParentID(card.id);
    console.log(totalProgress);

    // Calculate the progress as a percentage
    const progressPercentage =
        totalProgress.completed != 0 ? (totalProgress.completed / totalProgress.total) * 100 : 0;
    console.log(progressPercentage);

    // Format the date to "23 Jan 2023"
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(new Date(created_at));

    return (
        <div key={id} className={styles.todo_card}>
            <div className={styles.task_card_header}>
                <h2>
                    {' '}
                    <i className="bx bx-grid-small"></i> {name}
                </h2>
            </div>
            <span>{category}</span>
            <div className={styles.progress_container}>
                <h2>
                    <i className="bx bx-list-check"></i> Progress{' '}
                </h2>
                <span>
                    {' '}
                    {totalProgress.completed} / {totalProgress.total}{' '}
                </span>
            </div>

            <div className={styles.linebg}>
                <div className={styles.line} style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div>
                <div className="tags-container">
                    {card.tags.map((tag, idx) => {
                        return (
                            <div key={idx} className="tag">
                                {tag}
                            </div>
                        );
                    })}
                </div>
                <div className={styles.btn_container}>
                    <button className={styles.btn}>{formattedDate}</button>
                    <NavLink to={`/tasks/${card.id}`}>
                        <button className={styles.viewbtn}>View</button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default TodoParentCard;
