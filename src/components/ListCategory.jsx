import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaEllipsisV } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

// Fetch tasks from the server
const fetchTasks = async () => {
    const response = await fetch('http://localhost:3000/tasks');
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return response.json();
};

// Delete task from server
const deleteTask = async (taskId) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
    return taskId; // Return the task ID after deletion
};

const ListCategory = () => {
    const { data: tasks, isLoading, error, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
    });

    const [showMenu, setShowMenu] = useState(null);

    // Mutation to delete the task
    const { mutate } = useMutation({
        mutationFn: deleteTask,
        onSuccess: (taskId) => {
            // After deletion, refetch tasks to update the list
            Swal.fire({
                title: "Are you sure?",
                text: "You won't to delete now",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your data is deleted.",
                    icon: "success"
                  });
                }
              });
              refetch();
        },
        onError: (error) => {
            console.error("Error deleting task:", error);
        },
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Filter tasks by category
    const toDoTasks = tasks.filter((task) => task.category === 'To Do');
    const inProgressTasks = tasks.filter((task) => task.category === 'In Progress');
    const doneTasks = tasks.filter((task) => task.category === 'Done');

    const handleDelete = (taskId) => {
        mutate(taskId); // Call mutation to delete task
    };

    const toggleMenu = (taskId) => {
        if (showMenu === taskId) {
            setShowMenu(null);
        } else {
            setShowMenu(taskId);
        }
    };

    return (
        <div className='w-12/12 mx-auto py-5'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className='bg-black rounded-lg py-2 px-5'>
                    <h1 className='text-white font-semibold text-3xl'>To Do</h1>
                    <div className='my-5 border-2 text-white py-1 rounded-lg'>
                        {toDoTasks.length === 0 ? (
                            <div>
                                <h1>No Task Here Added</h1>
                                <p className="text-xs">Drag tasks here or create new ones</p>
                            </div>
                        ) : (
                            <ul>
                                {toDoTasks.map((task) => (
                                    <li key={task._id} className="px-4 py-2 my-2 relative">
                                        <div
                                            onClick={() => toggleMenu(task._id)}
                                            className="absolute top-2 left-72 cursor-pointer"
                                        >
                                            <FaEllipsisV className="text-white text-2xl" />
                                        </div>
                                        {showMenu === task._id && (
                                            <div className="absolute top-8 left-56 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
                                                <Link to={`/task/${task._id}`}>
                                                    <button
                                                        className="block mb-2 text-green-600"
                                                    >
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button
                                                    className="block text-red-600"
                                                    onClick={() => handleDelete(task._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                        <h2 className="text-white text-2xl"><span className='font-bold'>Title:</span> {task.title}</h2>
                                        <p className="text-xl"><span className='font-bold'>Description:</span> {task.description}</p>
                                        <p className="text-xl"><span className='font-bold'>Time:</span> {task.timestamp}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className='bg-black rounded-lg py-2 px-5'>
                    <h1 className='text-white font-semibold text-3xl'>To Do</h1>
                    <div className='my-5 border-2 text-white py-1 rounded-lg'>
                        {inProgressTasks.length === 0 ? (
                            <div>
                                <h1>No Task Here Added</h1>
                                <p className="text-xs">Drag tasks here or create new ones</p>
                            </div>
                        ) : (
                            <ul>
                                {inProgressTasks.map((task) => (
                                    <li key={task._id} className="px-4 py-2 my-2 relative">
                                        <div
                                            onClick={() => toggleMenu(task._id)}
                                            className="absolute top-2 left-72 cursor-pointer"
                                        >
                                            <FaEllipsisV className="text-white text-2xl" />
                                        </div>
                                        {showMenu === task._id && (
                                            <div className="absolute top-8 left-56 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
                                                <Link to={`/task/${task._id}`}>
                                                    <button
                                                        className="block mb-2 text-green-600"
                                                    >
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button
                                                    className="block text-red-600"
                                                    onClick={() => handleDelete(task._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                        <h2 className="text-white text-2xl"><span className='font-bold'>Title:</span> {task.title}</h2>
                                        <p className="text-xl"><span className='font-bold'>Description:</span> {task.description}</p>
                                        <p className="text-xl"><span className='font-bold'>Time:</span> {task.timestamp}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className='bg-black rounded-lg py-2 px-5'>
                    <h1 className='text-white font-semibold text-3xl'>Done</h1>
                    <div className='my-5 border-2 text-white py-1 rounded-lg'>
                        {doneTasks.length === 0 ? (
                            <div>
                                <h1>No Task Here Added</h1>
                                <p className="text-xs">Drag tasks here or create new ones</p>
                            </div>
                        ) : (
                            <ul>
                                {doneTasks.map((task) => (
                                    <li key={task._id} className="px-4 py-2 my-2 relative">
                                        <div
                                            onClick={() => toggleMenu(task._id)}
                                            className="absolute top-2 left-72 cursor-pointer"
                                        >
                                            <FaEllipsisV className="text-white text-2xl" />
                                        </div>
                                        {showMenu === task._id && (
                                            <div className="absolute top-8 left-56 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
                                                <Link to={`/task/${task._id}`}>
                                                    <button
                                                        className="block mb-2 text-green-600"
                                                    >
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button
                                                    className="block text-red-600"
                                                    onClick={() => handleDelete(task._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                        <h2 className="text-white text-2xl"><span className='font-bold'>Title:</span> {task.title}</h2>
                                        <p className="text-xl"><span className='font-bold'>Description:</span> {task.description}</p>
                                        <p className="text-xl"><span className='font-bold'>Time:</span> {task.timestamp}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListCategory;
