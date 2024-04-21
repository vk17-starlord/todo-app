import useCardContext from '@/hooks/useCardContext';

import styles from './card.module.css';
import {   useState } from 'react';
import Modal from '../modal/Modal';
import TaskCardForm from './TaskCardForm';
import TodoParentCard from './TodoParentCard';
// import { cardData } from '@/data/card';
// import { cardData } from '@/data/card.js'

function CardContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const store  = useCardContext();
  // store.addCards(cardData)

  const onSave = (val)=>{
    store.addCard(val);
    alert('Card Added !!')
    closeModal();
  }
  return (
	<div  className={styles.card_section}>
     <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TaskCardForm card={null} onSave={onSave} />
      </Modal>
      <div className={styles.section_header}>
      <h2 className={styles.section_heading}> <i className='bx bxs-dashboard'></i> Board View</h2>
      <button onClick={openModal} className={styles.section_addbtn}> Add Task </button>
      </div>
    <div className="grid-cols-3 task-container">
      {
        store.cards.length > 0 ? store.cards.map((card)=>{
          return (  <TodoParentCard id={card.id} key={`card-${card.id}`} card={card} /> )
        }) : <div className='not-found-container'>
          <h2 className='not-found'>No Cards Found</h2>
        </div>
      }
    </div>
  </div>
  )
}

export default CardContainer