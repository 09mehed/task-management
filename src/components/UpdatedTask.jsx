import React, { useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../Authprovider';

const UpdatedTask = () => {
    const task = useLoaderData();
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();

    console.log(task);

    const { _id, title, description, category } = task || {};

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;

        const updatedTask = { title, description, category };

        try {
            const { data } = await axios.put(
                `https://task-management-server-seven-wine.vercel.app/tasks/${_id}`,
                updatedTask,
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Task Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/'); 
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to update task. Try again!"
            });
        }
    };

    return (
        <div className='w-11/12 lg:w-6/12 mx-auto'>
            <h2 className='text-center text-2xl font-bold'>Update Task</h2>
            <form onSubmit={handleUpdateTask} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Title</span>
                    </label>
                    <input type="text" name='title' defaultValue={title} placeholder="Task Title" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Description</span>
                    </label>
                    <textarea name='description' defaultValue={description} className="textarea textarea-bordered" placeholder="Description" required></textarea>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Category</span>
                    </label>
                    <select name='category' defaultValue={category} className="select select-bordered w-full" required>
                        <option disabled>Select Category</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Update Task</button>
                </div>
            </form>
        </div>
    );
};

export default UpdatedTask;
