import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css'
import Header from "../components/Header/Header.js"
import rest from '../images/rest.jpg'

const Home = () => {
    const navigate = useNavigate();

    const [date, setDate] = useState("");
    const [availableRooms, setAvailableRooms] = useState([]);


    const onChangeDate = (e) => {
        setDate(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        let availability = {
            date: date
        }

        await axios.post('/reservation/check-availability', availability)
            .then(res => {
                console.log("Test")
                console.log(res.data.availableRooms[0])
                setAvailableRooms(res.data.availableRooms);
                // navigate('/login');
                // window.location.reload();
            })
            .catch(err => {
                alert("Invalid Date");
            })

    };

    const handleCardClick = (roomId) => {
        // Perform navigation to reservation page with the selected room ID
        // navigate.push(`/reservation/${roomId}`);
        window.location.href = `/reservation?roomId=${roomId}`;
    };

    return (
        <div className="landing-page">
            {/* <img src={logo} alt="Logo" className="logo" /> */}
            <Header />
            <h1 className="title">Mango restaurant</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="date" className="label">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={onChangeDate}
                        className="input"
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Check available rooms</button>
            </form>

            <div className="card-container">
                {availableRooms.map(room => (
                    <div key={room._id} className="card" onClick={() => handleCardClick(room._id)}>
                        <h2 className="room-title">Room {room.roomNumber}</h2>
                        <img src={rest} alt="Logo" className="rest" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home

