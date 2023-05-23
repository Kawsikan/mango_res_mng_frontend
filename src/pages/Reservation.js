import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './reservation.css'
import jwtDecode from 'jwt-decode';


const Reservation = () => {

    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('roomId');
    const roomNumber = urlParams.get('roomNumber')

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    const userEmail = decodedToken.email;
    const username = userEmail.split('@')[0];

    const [reservationData, setReservationData] = useState({
        guestId: userId,
        guestName: '',
        guestEmail: '',
        room: roomId,
        checkInDate: '',
        checkOutDate: '',
        boardType: 'Bed & Breakfast',
        occupancy: 'Single',
        parkingNeeded: false,
        inRoomAmenities: [],
        plannedArrivalTime: '',
        specialNotes: '',
        paymentMethod: 'Credit Card (Online)',
        totalAmount: 0,
        isCancelled: false,
        cancelledDate: null,
    });



    const handleChange = async (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setReservationData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));

        if (['checkInDate', 'checkOutDate', 'boardType', 'occupancy'].includes(name)) {
            try {
                const response = await axios.post('/reservation/calculate-total', {
                    checkInDate: name === 'checkInDate' ? newValue : reservationData.checkInDate,
                    checkOutDate: name === 'checkOutDate' ? newValue : reservationData.checkOutDate,
                    boardType: name === 'boardType' ? newValue : reservationData.boardType,
                    occupancy: name === 'occupancy' ? newValue : reservationData.occupancy,
                });

                setReservationData((prevData) => ({
                    ...prevData,
                    totalAmount: response.data,
                }));

            } catch (error) {
                console.error(error);
            }
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/reservation', reservationData)
            .then(res => {
                navigate('/');
                window.location.reload();
            })
            .catch(err => {
                alert("Failed");
                console.log(err);
            })
        console.log(reservationData);
    };


    return (
        <>
            <div className="reservation-form-container">
                <h1>Reservation Form</h1>
                <form onSubmit={handleSubmit} className="reservation-form">
                    <label className='label-sp'>
                        <span>Guest Name</span>
                        <input
                            type="text"
                            name="guestName"
                            value={reservationData.guestName}
                            onChange={handleChange} />
                    </label>
                    <br />
                    <label className='label-sp'>
                        <span>Guest Email</span>
                        <input
                            type="email"
                            name="guestEmail"
                            value={reservationData.guestEmail}
                            onChange={handleChange} />
                    </label>
                    <br />
                    <label className='label-sp'>
                        <span>Room</span>
                        <input
                            type="text"
                            name="room"
                            value={reservationData.room}
                            onChange={handleChange} />
                    </label>
                    <br />
                    <div className="date-fields">
                        <label className='label-sp'>
                            <span>Check-In Date</span>
                            <input
                                type="date"
                                name="checkInDate"
                                value={reservationData.checkInDate}
                                onChange={handleChange} />
                        </label>
                        <label className='label-sp'>
                            <span>Check-Out Date</span>
                            <input
                                type="date"
                                name="checkOutDate"
                                value={reservationData.checkOutDate}
                                onChange={handleChange} />
                        </label>
                    </div>
                    <br />
                    <div className="parallel-fields">
                        <label className='label-sp'>
                            <span>Board Type</span>
                            <select
                                name="boardType"
                                value={reservationData.boardType}
                                onChange={handleChange}
                            >
                                <option value="Bed & Breakfast">Bed & Breakfast</option>
                                <option value="Half-Board">Half-Board</option>
                                <option value="Full-Board">Full-Board</option>
                            </select>
                        </label>
                        <label className='label-sp'>
                            <span>Occupancy</span>
                            <select
                                name="occupancy"
                                value={reservationData.occupancy}
                                onChange={handleChange}
                            >
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Triple">Triple</option>
                            </select>
                        </label>
                    </div>
                    <br />
                    {/* <label>
        In-Room Amenities:
        <input
            type="checkbox"
            name="inRoomAmenities"
            value="TV"
            checked={reservationData.inRoomAmenities.includes('TV')}
            onChange={handleChange}
        />{' '}
        TV
        <input
            type="checkbox"
            name="inRoomAmenities"
            value="Wifi"
            checked={reservationData.inRoomAmenities.includes('Wifi')}
            onChange={handleChange}
        />{' '}
        Wifi
    </label>
    <br /> */}
                    <label className='label-sp'>
                        <span> Planned Arrival Time</span>
                        <input
                            type="time"
                            name="plannedArrivalTime"
                            value={reservationData.plannedArrivalTime}
                            onChange={handleChange} />
                    </label>
                    <br />
                    <label className='label-sp'>
                        <span>Special Notes</span>
                        <textarea
                            name="specialNotes"
                            value={reservationData.specialNotes}
                            onChange={handleChange} />
                    </label>
                    <br />
                    <label className='label-sp'>
                        <span>Payment Method</span>
                        <select
                            name="paymentMethod"
                            value={reservationData.paymentMethod}
                            onChange={handleChange}
                        >
                            <option value="Credit Card (Online)">Credit Card (Online)</option>
                            <option value="Credit Card (Onsite)">Credit Card (Onsite)</option>
                            <option value="Cash">Cash</option>
                        </select>
                    </label>
                    <br />
                    <label className="special-label">
                        Parking Needed
                        <input
                            type="checkbox"
                            name="parkingNeeded"
                            checked={reservationData.parkingNeeded}
                            onChange={handleChange} />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div className="form-container">
                <div className="total-amount-card">
                    <span className="total-amount-label">Hi! {username} your bill</span>
                    {/* <span className="total-amount-label">Total Amount</span> */}
                    <span className="total-amount-value">Rs.{reservationData.totalAmount}</span>
                </div>
            </div>
        </>

    );
};

export default Reservation;

