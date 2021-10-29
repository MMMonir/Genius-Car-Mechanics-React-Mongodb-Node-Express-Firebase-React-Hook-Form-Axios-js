import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Booking = () => {
    const { serviceId } = useParams();
    const [serviceDetails, setServiceDetails] = useState({});
    useEffect( () => {
        const url = `http://localhost:5000/services/${serviceId}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setServiceDetails(data))
    }, []);

    return (
        <div>
            <h2>this is booking: {serviceId}</h2>
            <img src={serviceDetails.img} alt="" />
            <h3>{serviceDetails.name}</h3>
            <p>Price: ${serviceDetails.price}</p>
            <p>{serviceDetails.description}</p>
        </div>
    );
};

export default Booking;