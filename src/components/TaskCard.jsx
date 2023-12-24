import PropTypes from 'prop-types';
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import axiosPublic from '../api';
import toast, { Toaster } from 'react-hot-toast';
import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';

const TaskCard = ({ task, refetch }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { id: task._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

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

    return (
        <div>
            <div><Toaster /></div>
            <div ref={drag} className={`bg-tmnavy text-tmwhite p-2 m-2 rounded-md ${isDragging ? "border-2" : "border-0"}`}>

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
                    <div className=''>
                        <button onClick={handleDelete} className="btn btn-sm  btn-outline py-1 text-xl text-tmwhite btn-circle mr-2">
                            <MdDelete />
                        </button>
                        <Link to={`/dashboard/taskDetails/${task._id}`}>
                            <button className="btn btn-sm btn-outline py-1 text-xl text-tmwhite btn-circle"><FaPencil /></button>
                        </Link>
                    </div>
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

