import { useContext } from "react";
import { FaHome, FaCalendarPlus } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import swal from "sweetalert";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(swal("Complete!", "logged out!", "success"))
    }
    return (
        <div className="flex flex-col lg:flex-row justify-center items-center">
            {/* dashboard side bar */}
            <div className=" lg:w-64 lg:mx-0 lg:mt-0 lg:min-h-screen rounded-md bg-tmred text-tmwhite">
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
                    <li>
                        <div className=" items-center">
                            <div className="w-5 rounded-full">
                                <img src={user?.photoURL ? user.photoURL : "https://i.ibb.co/F8JsB1D/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"} className="rounded-full" />
                            </div>
                            <p className="text-xs">{user?.displayName || user?.email}</p>
                        </div>
                        <button onClick={handleLogout} className="btn btn-sm text-xs">Log out</button>
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