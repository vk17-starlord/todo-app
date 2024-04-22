import TodoCardContainer from '@/components/cards/TodoCardContainer';
// import { tasks } from '@/data/subtasks';
import useCardContext from '@/hooks/useCardContext';
import useSubTaskContext from '@/hooks/useSubtaskContext';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import React from 'react';
function Task() {
    const { id } = useParams();
    const cardStore = useCardContext();
    const [currentCard, setcurrentCard] = useState(cardStore.currentCard);
    useEffect(() => {
        cardStore.setCurrentTaskCard(id);
        setcurrentCard(cardStore.currentCard);
    }, [cardStore, id]);

    const store = useSubTaskContext();
    const status = ['Pending', 'Completed', 'Incomplete'];
    const [subTasks, setsubTasks] = useState(store.getSubtasksByParentID(id));

    useEffect(() => {
        // store.addsubTasks(tasks.subtasks);
        setsubTasks(store.getSubtasksByParentID(id));
    }, [store, store.subtasks, id]);

    return (
        <div className="w-full">
            <div className="task-detail-header">
                <h2> {currentCard?.name} </h2>
                <p> {currentCard?.description}</p>
                <div className="tags-container">
                    {currentCard?.tags.map((tag, idx) => {
                        return (
                            <div key={idx} className="tag tag-large">
                                {tag}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                <p className="notice">
                    Please Drag and Drop the Tasks in Container ( In Progress , Completed ,
                    Incompleted ){' '}
                </p>
            </div>
            <div className="task-detail-container">
                <h2>Tasks</h2>
                <button className="add-btn">Add Task</button>
            </div>
            <div className="w-full">
                <div className="grid-cols-3">
                    {status.map((currstatus) => (
                        <TodoCardContainer
                            parentID={id}
                            key={currstatus}
                            tasks={subTasks.filter((ele) => ele.status == currstatus)}
                            status={currstatus}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Task;
