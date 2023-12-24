import { Link } from "react-router-dom";
import pic from "../assets/Free Macbook Pro and iPhone Mockup.png"

const Banner = () => {
    return (
        <div className="min-h-screen lg:flex items-center gap-20 justify-center
        bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-tmred  to-tmnavy
        ">
            <div className="max-w-lg">
                <h1 className="text-3xl md:text-5xl font-bold pt-28 lg:pt-0 text-tmwhite">Organize your tasks effectively</h1>
                <p className="py-6 text-tmwhite">Free, simple and easy task manager</p>
                <Link to="/login"><button className="btn btn-primary bg-tmred border-0 text-tmwhite">Let&apos;s explore</button></Link>
            </div>
            <div className="max-w-lg">
                <img src={pic} alt="" />
            </div>

        </div>

    );
};

export default Banner;