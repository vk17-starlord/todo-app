import useCardContext from '@/hooks/useCardContext';
import TodoCardContainer from './TodoCardContainer';
import styles from './card.module.css';
import { useEffect, useState } from 'react';
import { cardData } from '@/data/card.js'
function CardContainer() {
  const store  = useCardContext();
  const [cardContainerData, setcardContainerData] = useState([
    {
      id:'In Progress',
      heading:'In Progress Tasks',
      data:store.inProgress
    },
    {
      id:'Complete',
      heading:'Completed Tasks',
      data:store.complete
    },
    {
      id:'Incomplete',
      heading:'Incomplete Tasks',
      data:store.incomplete
    },
  ]);
  
  useEffect(()=>{
    setcardContainerData([
      {
        id:'In Progress',
        heading:'In Progress Tasks',
        data:store.inProgress
      },
      {
        id:'Complete',
        heading:'Completed Tasks',
        data:store.complete
      },
      {
        id:'Incomplete',
        heading:'Incomplete Tasks',
        data:store.incomplete
      },
    ])
  },[store])


  return (
	<div  className={styles.card_section}>
    <h2 className={styles.section_heading}> <i className='bx bxs-dashboard'></i> Board View</h2>

    <div className="grid-cols-3">
      {cardContainerData.map((card,idx)=>{
            return (<div key={`card-${idx}`} className="col" id={card.id}  >
              <TodoCardContainer id={card.id}   heading={card.heading} data={card.data} />
            </div>)
      })}
    </div>
  </div>
  )
}

export default CardContainer