import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css'
import Header from "../components/Header/Header.js"
import rest from '../images/rest.jpg'

const Home = () => {
    const navigate = useNavigate();

    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [availableRooms, setAvailableRooms] = useState([]);


    const onChangeCheckInDate = (e) => {
        setCheckInDate(e.target.value);
    }
    const onChangeCheckOutDate = (e) => {
        setCheckOutDate(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        let availability = {
            startDate: checkInDate,
            endDate: checkOutDate
        }

        await axios.post('/reservation/check-availability-range', availability)
            .then(res => {
                console.log("reservation working")
                console.log(res.data.availableRooms[0])
                setAvailableRooms(res.data.availableRooms);
            })
            .catch(err => {
                alert("Invalid Date");
            })

    };

    const handleCardClick = (roomId, roomNumber) => {
        // Perform navigation to reservation page with the selected room ID
        navigate(`/reservation?roomId=${roomId}&roomNumber=${roomNumber}`);
        // window.location.href = `/reservation?roomId=${roomId}&roomNumber=${roomNumber}`;
    };

    return (
        <div className="landing-page">
            <Header />
            <h1 className="title">Mango restaurant</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="checkInDate" className="label">Check in Date:</label>
                    <input
                        type="date"
                        id="checkInDate"
                        name="checkInDate"
                        value={checkInDate}
                        onChange={onChangeCheckInDate}
                        className="input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="checkOutDate" className="label">Check out Date:</label>
                    <input
                        type="date"
                        id="checkOutDate"
                        name="checkOutDate"
                        value={checkOutDate}
                        onChange={onChangeCheckOutDate}
                        className="input"
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Check available rooms</button>
            </form>

            <div className="card-container">
                {availableRooms.map(room => (
                    <div key={room._id} className="card" onClick={() => handleCardClick(room._id, room.roomNumber)}>
                        <h2 className="room-title">Room {room.roomNumber}</h2>
                        <img src={rest} alt="Logo" className="rest" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home

