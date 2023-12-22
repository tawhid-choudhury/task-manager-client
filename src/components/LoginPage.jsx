import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import swal from 'sweetalert';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProvider";


const LoginPage = () => {

    const { loginEmailPass, googleSignin, user } = useContext(AuthContext)
    const nav = useNavigate();
    const [errorText, setErrorText] = useState("")
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        loginEmailPass(email, password)
            .then((uc) => {
                console.log(uc);
                swal("Complete!", "Logged in!", "success");
                nav(location?.state ? location.state : "/")
            }).catch((err) => {
                if (err.code === "auth/invalid-login-credentials") {
                    swal("Error!", "Invalid login credentials", "error");
                    setErrorText("Invalid login credentials");
                } else {
                    swal("Error:", err);
                    setErrorText("Error:", err);
                    console.log(err);
                }
            })
    }

    const handleGoogle = () => {
        googleSignin()
            .then((uc) => {
                console.log(uc);
                swal("Complete!", "Logged in!", "success");
                nav(location?.state ? location.state : "/")
            }).catch((err) => {
                if (err.code === "auth/email-already-in-use") {
                    swal("Error!", "Email is already in use. Please choose a different email.", "error");
                    setErrorText("Email is already in use");
                } else {
                    swal("Error:", err);
                    setErrorText("Error:", err);
                    console.log(err);
                }
            })
    }

    return (
        <div>
            <div>
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Login now!</h1>
                            <p className="py-6">Unlock the future of secure online access with us. Join our community and experience seamless authentication. Your digital journey begins here.</p>
                        </div>

                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            {user ? <div className="text-center text-2xl p-5">

                                <p className="mb-5">Logged in with:</p>
                                <div className="flex justify-center">
                                    <img className="w-[100px] rounded-full" src={user?.photoURL ? user.photoURL : "https://i.ibb.co/F8JsB1D/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"} alt="" />
                                </div>
                                <h3 className="text-2x">{user?.email}</h3>
                            </div> :
                                <div>
                                    <form className="card-body" onSubmit={handleSubmit}>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input type="email" placeholder="email" name="email" className="input input-bordered " required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Password</span>
                                            </label>
                                            <input type="password" placeholder="password" name="password" className="input input-bordered " required />
                                        </div>
                                        <div className="">
                                            {errorText && <p className="text-red-500 py-2">{errorText}</p>}
                                        </div>
                                        <div className="form-control mt-6">
                                            <button className="btn bg-tmred text-tmwhite btn-outline">Login</button>
                                        </div>
                                    </form>
                                    <div className="card-body">
                                        <p className="text-center text-white">Sign in using:</p>
                                        <div className="flex justify-center gap-5 mt-5">
                                            <button onClick={handleGoogle} className="btn btn-block btn-warning"><span className="text-2xl"><FcGoogle></FcGoogle></span> Log in using Google</button>
                                        </div>
                                    </div>
                                    <p className="text-white text-center py-5">Don&apos;t have an account? <Link to="/register"><span className="underline text-blue-500">Register Now</span></Link></p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LoginPage;