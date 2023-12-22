import { FaHome, FaCalendarPlus } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-tmred text-tmwhite">
                <ul className="menu p-4">
                    <li>
                        <NavLink to="/dashboard/dashboardhome">
                            <MdOutlineDashboard></MdOutlineDashboard>
                            Dashboard</NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink to="/dashboard/add">
                            <FaCalendarPlus ></FaCalendarPlus >
                            Add a Task</NavLink>
                    </li>
                    <hr className="pb-2" />
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;