import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


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
        const currentDate = new Date();

        await axios.post('/users/login-user', user)
            .then(res => {
                console.log("login success")
                console.log(res.data.token)
                console.log(currentDate)
                localStorage.setItem('token', res.data.token);
                // navigate('/login');
                // window.location.reload();
            })
            .catch(err => {
                alert("Invalid username or password");
            })

    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="email">Email:</label>
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
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
