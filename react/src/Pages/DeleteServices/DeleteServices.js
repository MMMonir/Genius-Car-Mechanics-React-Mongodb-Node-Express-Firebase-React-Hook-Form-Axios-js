import React, { useEffect, useState } from 'react';

const DeleteServices = () => {
    const [services, setServices] = useState([]);
    useEffect( () => {
        fetch('http://localhost:5000/services')
        .then(res => res.json())
        .then(data => setServices(data))
    }, []);

    const handleDelete = id =>{
        //Are you want to Delete Alert, If yes then delete one user
        const proceed = window.confirm('Are you sure, You want to delete?');
        if(proceed){
            const url = `http://localhost:5000/services/${id}`;
            fetch(url, {method: 'DELETE'})
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount> 0){
                    alert('Deleted successfully');
                    //Remove user from UI
                    const remainingUsers = services.filter(service => service._id !== id);
                    setServices(remainingUsers);
                }
            });
        }
    };
    return (
        <div>
            <h2>This is Service Delete Page.</h2>
            {
                services.map(service => <div key={service._id}>
                    <h3>{service.name}</h3>
                    <button onClick={()=> handleDelete(service._id)}>Delete</button>
                </div>)
            }
        </div>
    );
};

export default DeleteServices;