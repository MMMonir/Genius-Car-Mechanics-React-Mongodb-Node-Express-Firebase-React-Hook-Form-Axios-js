import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import './AddService.css';

const AddService = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        console.log(data);
        axios.post('http://localhost:5000/services', data)
        .then(res => {
            if(res.data.insertedId){
                alert('Successfully added');
                reset();
            }
        })
    };
    return (
        <div className="add-service">
            <h2>Please add a Service</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name", { required: true, maxLength: 20 })} placeholder="Name"/>
            <textarea {...register("description")} placeholder="Description"/>
            <input type="number" {...register("price")} placeholder="Price"/>
            <input {...register("img")} placeholder="Image Url"/>
            <input type="submit" />
            </form>
        </div>
    );
};

export default AddService;