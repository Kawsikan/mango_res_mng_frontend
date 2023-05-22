import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css'


const Signup = () => {
    const navigate = useNavigate();


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeName = (e) => {
        setName(e.target.value);
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let user = {
            name: name,
            email: email,
            password: password
        }

        await axios.post('/users/register-user', user)
            .then(res => {
                navigate('/login');

                window.location.reload();
            })
            .catch(err => {
                alert("Invalid username or password");
            })


    };

    return (
        <div className="reservation-form-container">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit} className="reservation-form">
                <div>
                    <label htmlFor="name" className='label-sp'>Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onChangeName}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className='label-sp'>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className='label-sp'>Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        required
                    />
                </div>
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
