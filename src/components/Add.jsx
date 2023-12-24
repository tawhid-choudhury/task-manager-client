// import { useState } from "react";
import { useContext, useState } from "react";
import swal from "sweetalert";
import { AuthContext } from "../providers/AuthProvider";
import axiosPublic from "../api";
import toast, { Toaster } from "react-hot-toast";

const Add = () => {
    const { user } = useContext(AuthContext);
    const [deadline, setDeadline] = useState(new Date());

    const handleAdd = async (e) => {
        e.preventDefault();
        const form = e.target;
        const task = form.task.value;
        if (!task) {
            swal("Warning", "Enter task please", "warning")
            return;
        }
        const priority = form.priority.value;
        if (!priority) {
            swal("Warning", "select priority please", "warning")
            return;
        }

        if (!deadline) {
            swal("Warning", "select deadline please", "warning")
            return;
        }

        const newTask = { name: task, priority, deadline, status: "todo", userEmail: user.email }

        console.log(newTask);

        const res = await axiosPublic.post('/addtask', newTask)
        console.log(res);
        if (res.data?.insertedId) {
            toast.success('Successfully added!')
        }

    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div><Toaster /></div>
            <form className="w-full max-w-7xl" onSubmit={handleAdd}>
                <div>
                    <div className="w-full">
                        <label className="label">
                            <span className="label-text">Task:</span>
                        </label>
                        <input type="text" placeholder="Task" name="task" className="input input-bordered w-full" />
                    </div>


                    <div className="w-full">
                        <label className="label">
                            <span className="label-text">Priority:</span>
                        </label>
                        <select name="priority" className="select select-bordered w-full" defaultValue={""}>
                            <option disabled value="">
                                Select from below
                            </option>
                            <option value="high">High</option>
                            <option value="moderate">Modarate</option>
                            <option value="low">low</option>
                        </select>
                    </div>

                    <div className="w-full">
                        <label className="label">
                            <span className="label-text">Type</span>
                        </label>
                        <input type="date" onChange={(e) => setDeadline(e.target.value)} name="type" className="input input-bordered w-full" />
                    </div>
                </div>

                <input type="submit" value="Add" className="btn btn-block  btn-accent my-7 " />

            </form>


        </div>
    );
};

export default Add;