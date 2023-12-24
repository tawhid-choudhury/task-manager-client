import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../api';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const UpdateTask = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const {
        isFetching: isTaskFetching,
        isError: taskError,
        data: task,
        refetch
    } = useQuery({
        queryKey: ['tasks', user.email],
        queryFn: () => axiosPublic.get(`/taskdetails/${id}`).then((res) => res.data),
    });

    if (isTaskFetching) return 'Loading...';

    if (taskError) return 'An error has occurred while fetching task: ' + taskError.message;

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
        const deadline = form.deadline.value;
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
        <div>
            <div><Toaster /></div>
            <div className="">
                <h3 className="font-bold text-lg">Update Task</h3>
                <div className=" w-full justify-center">
                    <form onSubmit={handleUpdate}>
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
                            <input type="date" name="deadline" className="input input-bordered w-full" defaultValue={task.deadline} />
                        </div>
                        <input type='submit' className='btn w-full my-5 bg-tmnavy text-tmwhite' value={"Update"} />
                    </form>
                </div>
            </div>


        </div>
    );
};

export default UpdateTask;