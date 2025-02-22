import { useMutation } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const updateTask = async (taskId, updatedData) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error('Failed to update task');
    }
    return response.json();
};

const UpdatedTask = ({ task }) => {
    const { mutate: mutateUpdateTask } = useMutation(updateTask);

    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState({
        title: '',
        description: '',
        category: '',
    });

    useEffect(() => {
        console.log(task);
        // Check if task is available before setting state
        if (task) {
            setUpdatedTask({
                title: task.title,
                description: task.description,
                category: task.category,
            });
        } else {
            console.log('Task not found or undefined');
        }
    }, [task]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if task._id exists before submitting
        if (task && task._id) {
            mutateUpdateTask(task._id, updatedTask, {
                onSuccess: () => {
                    setIsEditing(false);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Task updated successfully.',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    });
                },
                onError: (error) => {
                    Swal.fire({
                        title: 'Error!',
                        text: error.message || 'Failed to update task.',
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                    });
                },
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Task not found or invalid task ID.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <div className='lg:w-9/12 w-full mx-auto'>
            <h1 className='text-3xl font-bold text-center py-3'>Update Task</h1>
            <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Title</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={updatedTask.title}
                        onChange={handleChange}
                        placeholder="Write the task name"
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Description</span>
                    </label>
                    <textarea
                        name="description"
                        placeholder="Task Description"
                        value={updatedTask.description}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                        required
                    ></textarea>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Category</span>
                    </label>
                    <select
                        name="category"
                        className="select select-bordered lg:w-72 w-full"
                        value={updatedTask.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select Category</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary text-white w-56 text-xl">Update Task</button>
                </div>
            </form>
        </div>
    );
};

export default UpdatedTask;
