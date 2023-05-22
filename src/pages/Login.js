import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'


const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        let user = {
            email: email,
            password: password
        }

        await axios.post('/users/login-user', user)
            .then(res => {
                console.log("login success")
                console.log(res.data.token)
                localStorage.setItem('token', res.data.token);
                navigate('/');
                // window.location.reload();
            })
            .catch(err => {
                alert("Invalid username or password");
            })

    };

    return (
        <div className="reservation-form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="reservation-form">

                <div>
                    <label htmlFor="email" className='label-sp'>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        class="input-field"
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
                        class="input-field"
                        required
                    />
                </div>
                <br/>
                <button  class="button" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
