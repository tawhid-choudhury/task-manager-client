import { IoHomeOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { IoLogInOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
const Navbar = () => {
    return (
        <div className="relative">
            <div className="join fixed left-1/2 transform -translate-x-1/2 mt-5">
                <button className="btn join-item flex flex-col"><IoHomeOutline />Home</button>
                <button className="btn join-item flex flex-col"><RxDashboard />Dashboard</button>
                <button className="btn join-item flex flex-col"><IoLogInOutline />Login</button>
                <button className="btn join-item flex flex-col"><IoPersonAddOutline />Signup</button>
            </div>
        </div>
    );
};

export default Navbar;