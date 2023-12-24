import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { AuthContext } from "../providers/AuthProvider";

const SignupPage = () => {

    const { regEmailPass, googleSignin, user, updateName, setLoader } = useContext(AuthContext)
    const nav = useNavigate();
    const [errorText, setErrorText] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photourl = e.target.photourl.value;
        // eslint-disable-next-line no-useless-escape
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{6,}$/;
        if (!regex.test(password)) {
            swal("Error!", "Password does not match minimum requirement", "error");
            setErrorText("Password does not match minimum requirement")
            return;
        }
        console.log(photourl);
        regEmailPass(email, password)
            .then((uc) => {
                console.log(uc);
                if (name || photourl) {
                    updateName(uc.user, name, photourl).then(() => {
                        console.log("display name set as :" + name);
                        setLoader(false)
                    }).catch(err => {
                        console.log(err);
                    });
                }
                swal("Complete!", "Account Created!", "success");
                nav("/")
            }).catch((err) => {
                if (err.code === "auth/email-already-in-use") {
                    swal("Error!", "Email is already in use. Please choose a different email.", "error");
                    setErrorText("Email is already in use");
                } else {
                    swal("Error:", err);
                    setErrorText("Error:", err);
                }
            })
    }

    const handleGoogle = () => {
        googleSignin()
            .then((uc) => {
                console.log(uc);
                swal("Complete!", "Account Created!", "success");
                nav("/")
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
            <div className="text-sm">
                <div className="hero min-h-screen bg-base-200 pt-20">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Register now!</h1>
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
                                            <p>Password Requirements:</p>
                                            <li>At least 6-charecter long</li>
                                            <li>At least one special charecter</li>
                                            <li>At least one Uppercase letter</li>
                                            {errorText && <p className="text-red-500 py-2">{errorText}</p>}
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Display Name</span>
                                            </label>
                                            <input type="Text" placeholder="Display Name (OPTIONAL)" name="name" className="input input-bordered " />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Photo url</span>
                                            </label>
                                            <input type="url" placeholder="Photo url (OPTIONAL)" name="photourl" className="input input-bordered " />
                                        </div>
                                        <div className="form-control">
                                            <button className="btn bg-tmred text-tmwhite">Register</button>
                                        </div>
                                    </form>
                                    <div className="card-body">
                                        <p className="text-center">Sign up using:</p>
                                        <div className="flex justify-center">
                                            <button onClick={handleGoogle} className="btn btn-warning btn-block "><span className="text-2xl"><FcGoogle></FcGoogle></span> Sign up using Google</button>
                                        </div>
                                    </div>
                                    <p className=" text-center py-2">Already have an account? <Link to="/login"><span className="underline text-blue-500">Login Now</span></Link></p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SignupPage;