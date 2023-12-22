import { useEffect, useState } from "react";
import axiosPublic from "../api";


const DashboardHome = () => {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        axiosPublic('/all')
            .then(res => setTasks(res.data))
    }, [])
    console.log(tasks);
    return (
        <div>
            {tasks.map(task => <p>{task.name}</p>)}
        </div>
    );
};

export default DashboardHome;