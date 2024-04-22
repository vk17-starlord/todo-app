import CardContainer from '@/components/cards/CardContainer';
import styles from './dashboard.module.css';

function Dashboard() {
    return (
        <div className="w-full dashboard-container">
            <div className="w-full">
                <h2 className={styles.heading}>Welcome User 👋🏻 </h2>
            </div>
            <CardContainer></CardContainer>
        </div>
    );
}

export default Dashboard;
