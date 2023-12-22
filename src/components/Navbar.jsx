import { IoHomeOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { IoLogInOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
const Navbar = () => {
    return (
        <div className="relative">
            <div className="join fixed left-1/2 transform -translate-x-1/2 mt-2">
                <NavLink to="/"><button className="btn text-tmwhite border-tmnavy bg-tmred join-item flex flex-col"><IoHomeOutline />Home</button></NavLink>
                <NavLink to="/dashboard"><button className="btn text-tmwhite border-tmnavy bg-tmred join-item flex flex-col"><RxDashboard />Dashboard</button></NavLink>
                <NavLink to="/login"><button className="btn text-tmwhite border-tmnavy bg-tmred join-item flex flex-col"><IoLogInOutline />Login</button></NavLink>
                <NavLink to="/signup"><button className="btn text-tmwhite border-tmnavy bg-tmred join-item flex flex-col"><IoPersonAddOutline />Sign up</button></NavLink>
            </div>
        </div>
    );
};

export default Navbar;