import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const addTask = async (newTask) => {
    const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
    });

    if (!response.ok) {
        throw new Error("Failed to add task");
    }

    return response.json();
};

const AddTask = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const mutation = useMutation({
        mutationFn: addTask,
        onSuccess: () => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Task Added Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          setTitle('');
          setDescription('');
          setSelectedCategory('');
        },
        onError: (error) => {
          alert(`Error: ${error.message}`);
        },
      });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create new task object
        const newTask = {
            title,
            description,
            category: selectedCategory,
            timestamp: new Date().toISOString(), // Automatically generate timestamp
        };

        // Call mutate function to POST data
        mutation.mutate(newTask);
    };

    return (
        <div className='lg:w-9/12 w-full mx-auto'>
            <h1 className='text-3xl font-bold text-center py-3'>Add Task</h1>
            <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Title</span>
                    </label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Write the task name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Description</span>
                    </label>
                    <textarea
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="textarea textarea-bordered w-full" required></textarea>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Category</span>
                    </label>
                    <select
                        className="select select-bordered lg:w-72 w-full"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary text-white w-56 text-xl">Add Task</button>
                </div>
            </form>

        </div>
    );
};

export default AddTask;