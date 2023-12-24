
const SectionUsers = () => {
    return (
        <div>
            <h1 className="text-center py-10 text-2xl">This website is suitable for:</h1>
            <div className="max-w-4xl m-auto flex flex-wrap gap-5 mb-10">

                <div className="card w-96 text-neutral-content  flex flex-col justify-center items-center bg-tmnavy">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Task Developers</h2>
                        <p>Plan, create, and manage tasks collaboratively with our easy-to-use drag-and-drop interface. Stay organized and boost productivity.</p>
                        <div className="card-actions justify-end">
                            {/* Add any relevant actions or buttons here */}
                        </div>
                    </div>
                </div>

                <div className="card w-96 text-neutral-content  flex flex-col justify-center items-center bg-tmnavy">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Corporate Task Management</h2>
                        <p>Efficiently handle corporate tasks, streamline workflows, and monitor progress seamlessly using our intuitive drag-and-drop task management system.</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>

                <div className="card w-96 text-neutral-content  flex flex-col justify-center items-center bg-tmnavy">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Banking Task Solutions</h2>
                        <p>Optimize your banking operations by organizing and tracking tasks effortlessly. Our drag-and-drop feature ensures a smooth task management experience.</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>

                <div className="card w-96 text-neutral-content  flex flex-col justify-center items-center bg-tmnavy">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">For Everyone</h2>
                        <p>Simplify your daily tasks with our user-friendly drag-and-drop interface. Manage your to-dos efficiently, whether you are at work or home.</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default SectionUsers;