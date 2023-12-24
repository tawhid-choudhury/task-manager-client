import { useContext } from "react";
import axiosPublic from "../api";
import TaskCard from "./TaskCard";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useDrop } from "react-dnd";
import toast from "react-hot-toast";


// ... (import statements)

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const {
        isFetching: isTasksFetching,
        isError: tasksError,
        data: tasks,
        refetch,
    } = useQuery({
        queryKey: ['tasks', user.email],
        queryFn: () => axiosPublic.get(`/all?email=${user.email}`).then((res) => res.data),
    });

    const droppedToTodo = async (id) => {
        const res = await axiosPublic.patch(`/updateTaskStatus/${id}`, { status: "todo" });
        if (res.data?.modifiedCount === 1) {
            toast.success('Successfully modified!');
            refetch();
        }
    };

    const droppedToOngoing = async (id) => {
        const res = await axiosPublic.patch(`/updateTaskStatus/${id}`, { status: "ongoing" });
        if (res.data?.modifiedCount === 1) {
            toast.success('Successfully modified!');
            refetch();
        }
    };

    const droppedToCompleted = async (id) => {
        const res = await axiosPublic.patch(`/updateTaskStatus/${id}`, { status: "completed" });
        if (res.data?.modifiedCount === 1) {
            toast.success('Successfully modified!');
            refetch();
        }
    };

    const [{ isOver: isOverTodo }, dropTodo] = useDrop(() => ({
        accept: "task",
        drop: (item) => droppedToTodo(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const [{ isOver: isOverOngoing }, dropOngoing] = useDrop(() => ({
        accept: "task",
        drop: (item) => droppedToOngoing(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const [{ isOver: isOverCompleted }, dropCompleted] = useDrop(() => ({
        accept: "task",
        drop: (item) => droppedToCompleted(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    if (isTasksFetching) return 'Loading...';

    if (tasksError) return 'An error has occurred while fetching tasks: ' + tasksError.message;

    const todos = tasks?.filter((task) => task.status === 'todo');
    const ongoing = tasks?.filter((task) => task.status === 'ongoing');
    const completed = tasks?.filter((task) => task.status === 'completed');

    return (
        <div>
            <h1 className="text-2xl mb-6">Your Tasks:</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div ref={dropTodo} className="bg-tmnavy bg-opacity-70 p-2 rounded-md text-tmwhite min-h-[500px]">
                    <h1 className="text-lg">Todos</h1>
                    {todos?.map((task) => (
                        <TaskCard key={task._id} task={task} refetch={refetch}></TaskCard>
                    ))}
                </div>
                <div ref={dropOngoing} className="bg-tmnavy bg-opacity-70 p-2 rounded-md text-tmwhite min-h-[500px]">
                    <h1 className="text-lg">Ongoing</h1>
                    {ongoing?.map((task) => (
                        <TaskCard key={task._id} task={task} refetch={refetch}></TaskCard>
                    ))}
                </div>
                <div ref={dropCompleted} className="bg-tmnavy bg-opacity-70 p-2 rounded-md text-tmwhite min-h-[500px]">
                    <h1 className="text-lg">Completed</h1>
                    {completed?.map((task) => (
                        <TaskCard key={task._id} task={task} refetch={refetch}></TaskCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
