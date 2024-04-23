import { useState } from 'react';
import TaskForm from '../forms/TaskForm';
import Modal from '../modal/Modal';
import TaskContainer from './TaskContainer';
import TaskHeader from './TaskHeader';
import { v4 as uuidv4 } from 'uuid';
import useTaskContext from '../hooks/useTaskContext';

function Task() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const taskContext = useTaskContext();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onSubmit = (val) => {
        // Create a new task object with the unique ID and other properties from the input
        const task = {
            id: uuidv4(), // Assigning the generated UUID to the task object
            title: val.title,
            time: val.time,
            tags: val.tags,
            status: 'Incomplete' // Ensure a comma is placed at the end of each property
        };
        taskContext.addTask(val.category, task);

        closeModal();
    };

    const [currentCard, setcurrentCard] = useState(null);
    const openEdit = (card) => {
        setcurrentCard(card);
        openModal();
    };

    const onEdit = (val) => {
        const task = {
            id: val.id, // Assigning the generated UUID to the task object
            title: val.title,
            time: val.time,
            tags: val.tags,
            status: val.status // Ensure a comma is placed at the end of each property
        };
        taskContext.updateTask(val.category, task.id, task);
        closeModal();
        setcurrentCard(null);
    };
    return (
        <div className="w-full">
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <TaskForm onEdit={onEdit} task={currentCard} onSubmit={onSubmit} />
            </Modal>
            <TaskHeader />
            <TaskContainer openEditForm={openEdit} />
            <button className="add-task" onClick={openModal}>
                <i className="bx bxs-add-to-queue"></i>
            </button>
        </div>
    );
}

export default Task;
