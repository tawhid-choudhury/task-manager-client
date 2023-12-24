import { IoHomeOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { IoLogInOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import swal from "sweetalert";
const Navbar = () => {
    const { user, logout, loader } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(swal("Complete!", "logged out!", "success"))
    }

    return (
        <div className="relative z-50">
            <div className="join fixed left-1/2 transform -translate-x-1/2 mt-2">
                <NavLink to="/"><button className="btn text-tmwhite border-tmnavy bg-tmred join-item flex flex-col"><IoHomeOutline />Home</button></NavLink>
                <NavLink to="/dashboard/dashboardhome"><button className="btn text-tmwhite border-tmnavy bg-tmred join-item flex flex-col"><RxDashboard />Dashboard</button></NavLink>
                {!user && <NavLink to="/login"><button className="btn text-tmwhite border-tmnavy bg-tmred join-item flex flex-col"><IoLogInOutline />Login</button></NavLink>}
                {!user && <NavLink to="/signup"><button className="btn text-tmwhite border-tmnavy bg-tmred join-item flex flex-col"><IoPersonAddOutline />SignUp</button></NavLink>}
            </div>
            {loader ?
                <div className='flex justify-end items-center px-20'><span className="loading loading-spinner loading-md "></span></div>
                :
                <div className={`px-20 py-1 bg-base-300 ${!user && "hidden"}`}>
                    <div className="flex gap-5 items-center justify-end">
                        <div className="w-7 rounded-full">
                            <img src={user?.photoURL ? user.photoURL : "https://i.ibb.co/F8JsB1D/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"} className="rounded-full" />
                        </div>
                        <p className="text-xs">{user?.displayName || user?.email}</p>
                        <button onClick={handleLogout} className="btn btn-outline btn-sm">Log out</button>
                    </div>
                </div>}
        </div>
    );
};

export default Navbar;