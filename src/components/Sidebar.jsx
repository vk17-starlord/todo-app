import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
    console.log(location);
    return (
        <div className="sidebar">
            <h2 className="logo">
                <i className="bx bxl-sketch"></i> TaskTrail
            </h2>

            <div className="menu">
                <NavLink to="/tasks">
                    <i className="bx bx-grid-alt"></i> Tasks
                </NavLink>
                <NavLink to="/focus">
                    <i className="bx bxs-timer"></i> Focus Mode
                </NavLink>
                <NavLink to="/calender">
                    <i className="bx bxs-calendar-heart"></i> Calender
                </NavLink>
            </div>

            <div></div>
        </div>
    );
}

export default Sidebar;
