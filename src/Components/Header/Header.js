import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css'
import Auth from '../Auth/useAuth';

const Header = () => {
    const auth = Auth();

    return (
        <div className="container">
            <header className="header">
                <h2 className="logo"><Link to="/">Quiz</Link></h2>

                <nav className="navbar">
                    <ul className="navbarMenu">
                        <li><NavLink exact activeClassName='active' to='/'>Home</NavLink></li>
                        <li><NavLink exact to='/quiz'>Quiz</NavLink></li>
                        <li><NavLink exact to='/contact'>Contact</NavLink></li>
                        {
                            auth.user ? <li><NavLink exact to='/entry'>Profile</NavLink></li> :
                                <li><NavLink exact to='/entry'>Register/Login</NavLink></li>
                        }
                    </ul> {/* Navbar Menu */}
                </nav> {/* Navbar */}
            </header> {/*Header */}
        </div> // Container 
    );
};

export default Header;
