import PropTypes from 'prop-types';
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import axiosPublic from '../api';
import toast, { Toaster } from 'react-hot-toast';
import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import swal from 'sweetalert';

const TaskCard = ({ task, refetch }) => {
    const { user } = useContext(AuthContext);
    const [deadline, setDeadline] = useState(task?.deadline || new Date());

    const handleDelete = () => {
        axiosPublic.delete(`/all/${task._id}`)
            .then(res => {
                if (res.data.deletedCount === 1) {
                    toast.success('Successfully Deleted!')
                    refetch();
                }
            }
            )
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        if (!name) {
            swal("Warning", "Enter name please", "warning")
            return;
        }
        const priority = form.priority.value;
        if (!priority) {
            swal("Warning", "select priority please", "warning")
            return;
        }
        const status = form.status.value;
        if (!status) {
            swal("Warning", "select status please", "warning")
            return;
        }

        if (!deadline) {
            swal("Warning", "select deadline please", "warning")
            return;
        }

        const newTask = { name, priority, deadline, status, userEmail: user.email }

        console.log(newTask);
        console.log(task._id);
        const res = await axiosPublic.patch(`/updateTask/${task._id}`, newTask)
        console.log(res);
        if (res.data?.modifiedCount === 1) {
            toast.success('Successfully modified!')
            refetch();
        }

    }


    return (
        <div className='bg-tmnavy text-tmwhite p-2 m-2 rounded-md'>
            <div><Toaster /></div>

            <div className='flex justify-between'>
                <div>
                    <div className='flex justify-start items-start gap-2'>
                        <h4 className='font-bold'>{task?.name}</h4>
                        {task?.priority === 'high' && <p className='bg-tmred w-fit px-1 text-xs rounded-md' >High</p>}
                        {task?.priority === 'moderate' && <p className='bg-[#FFAA33] w-fit px-1 text-xs rounded-md' >Moderate</p>}
                        {task?.priority === 'low' && <p className='bg-[#097969] w-fit px-1 text-xs rounded-md' >Low</p>}
                    </div>
                    <p className='text-sm'>Deadline: {task?.deadline}</p>
                </div>
                <div className='flex gap-2'>
                    <button onClick={handleDelete} className="btn btn-outline py-1 text-xl text-tmwhite btn-circle">
                        <MdDelete />
                    </button>
                    <button onClick={() => document.getElementById(`my_modal_${task._id}`).showModal()} className="btn btn-outline py-1 text-xl text-tmwhite btn-circle">
                        <FaPencil />
                    </button>
                    <dialog id={`my_modal_${task._id}`} className="modal modal-bottom sm:modal-middle text-[#000000]">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Update Task</h3>
                            <div className=" w-full justify-center">
                                <form method="dialog" onSubmit={handleUpdate}>
                                    {/* if there is a button in form, it will close the modal */}


                                    <div className="">
                                        <label className="label">
                                            <span className="label-text">Task:</span>
                                        </label>
                                        <input type="text" placeholder="name" name="name" className="input input-bordered w-full" defaultValue={task.name} />
                                    </div>


                                    <div className="w-full">
                                        <label className="label">
                                            <span className="label-text">Priority:</span>
                                        </label>
                                        <select name="priority" className="select select-bordered w-full" defaultValue={task.priority}>
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
                                            <span className="label-text">Status:</span>
                                        </label>
                                        <select name="status" className="select select-bordered w-full" defaultValue={task.status}>
                                            <option disabled value="">
                                                Select from below
                                            </option>
                                            <option value="todo">Todo</option>
                                            <option value="ongoing">Ongoing</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>

                                    <div className="w-full">
                                        <label className="label">
                                            <span className="label-text">Type</span>
                                        </label>
                                        <input type="date" onChange={(e) => setDeadline(e.target.value)} name="type" className="input input-bordered w-full" defaultValue={task?.deadline || ""} />
                                    </div>
                                    <input type='submit' className='btn w-full my-5 bg-tmnavy text-tmwhite' value={"Update"} />
                                </form>
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

TaskCard.propTypes = {
    task: PropTypes.object,
    refetch: PropTypes.func,
};

export default TaskCard;

