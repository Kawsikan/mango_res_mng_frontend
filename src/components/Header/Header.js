import React from 'react';
import logo from '../../images/logo.png'; 
import './styles.css';

const Header = () => {
    return (
        <header className="header">
            <img src={logo} alt="Logo" className="logo" />
            <h1 className="title">Mango restaurant</h1>
        </header>
    );
};

export default Header;
