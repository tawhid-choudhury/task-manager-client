import { useContext, useEffect, useState } from "react";
import axiosPublic from "../api";
import TaskCard from "./TaskCard";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const DashboardHome = () => {
    const { user } = useContext(AuthContext)
    const {
        isFetching: isTasksFetching,
        isError: tasksError,
        data: tasks,
        refetch
    } = useQuery({
        queryKey: ['tasks', user.email],
        queryFn: () => axiosPublic.get(`/all?email=${user.email}`).then((res) => res.data),
    });

    if (isTasksFetching) return 'Loading...';

    if (tasksError) return 'An error has occurred while fetching tasks: ' + tasksError.message;

    const todos = tasks?.filter((task) => task.status === 'todo');
    const ongoing = tasks?.filter((task) => task.status === 'ongoing');
    const completed = tasks?.filter((task) => task.status === 'completed');


    console.log(tasks);
    return (
        <div>
            <h1 className="text-2xl mb-6">Your Tasks:</h1>
            <div className="grid grid-cols-3 gap-5">
                <div className="bg-tmnavy bg-opacity-70 p-2 rounded-md text-tmwhite min-h-[500px]">
                    <h1 className="text-lg">Todos</h1>
                    {todos?.map(task => <TaskCard key={task._id} task={task} refetch={refetch}></TaskCard>)}
                </div>
                <div className="bg-tmnavy bg-opacity-70 p-2 rounded-md text-tmwhite min-h-[500px]">
                    <h1 className="text-lg">Ongoing</h1>
                    {ongoing?.map(task => <TaskCard key={task._id} task={task} refetch={refetch}></TaskCard>)}
                </div>
                <div className="bg-tmnavy bg-opacity-70 p-2 rounded-md text-tmwhite min-h-[500px]">
                    <h1 className="text-lg">Completed</h1>
                    {completed?.map(task => <TaskCard key={task._id} task={task} refetch={refetch}></TaskCard>)}
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;