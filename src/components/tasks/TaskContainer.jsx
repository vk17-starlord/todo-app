import React, { useEffect, useState } from 'react';
import useTaskContext from '../hooks/useTaskContext';
import useCategoryContext from '../hooks/useCategoryContext';
import PropTypes from 'prop-types';

import TodoBoard from './TodoBoard';

function TaskContainer({ openEditForm }) {
    const taskContext = useTaskContext();
    const categoryContext = useCategoryContext();
    const boards = ['Pending', 'Completed', 'Incomplete'];

    const [tasks, settasks] = useState([]);

    const [active, setactive] = useState();

    const [showOnly, setshowOnly] = useState('Pending');

    useEffect(() => {
        const activeCategory = categoryContext.activeCategory;
        const tasks = taskContext.getTasksByCategoryId(activeCategory);
        console.log(tasks);
        console.log(tasks);
        settasks(tasks);
        setactive(activeCategory);
    }, [categoryContext.activeCategory, taskContext.tasks, showOnly, taskContext]);

    return (
        <div className="w-full">
            <div className="w-full grid-cols-3 hide-on-small">
                {boards.map((board) => {
                    return (
                        <TodoBoard
                            openEditForm={openEditForm}
                            key={board}
                            categoryID={active}
                            tasks={tasks.filter((ele) => ele.status == board)}
                            status={board}
                        ></TodoBoard>
                    );
                })}
            </div>

            <div className="show-on-small">
                <div className="w-full mobile-header">
                    <h2>Tasks </h2>
                </div>
                <div className="w-full mobile-tab">
                    {boards.map((ele) => {
                        return (
                            <button
                                key={ele}
                                className={`${showOnly == ele ? 'active-btn' : ''}`}
                                onClick={() => {
                                    setshowOnly(ele);
                                }}
                            >
                                {ele}
                            </button>
                        );
                    })}
                </div>
                <TodoBoard
                    categoryID={active}
                    tasks={tasks.filter((ele) => ele.status == showOnly)}
                    status={showOnly}
                    openEditForm={openEditForm}
                ></TodoBoard>
            </div>
        </div>
    );
}

TaskContainer.propTypes = {
    openEditForm: PropTypes.func
};
export default TaskContainer;
