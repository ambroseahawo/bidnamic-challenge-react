import React from 'react';
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom';
import { handleLogout } from '../../utils/Utilities';
import './navbar.css'

const Navbar = () => {
    const [cookies] = useCookies(['loginToken'])
    
    return (
        <nav className="navbar">
            <Link className='navbar-logo' to='/'>Challenge</Link>
            { cookies.loginToken ? (
                <ul className="nav-menu">
                    <li className="nav-item">
                        <button className='nav-links btn' onClick={ handleLogout }>Logout</button>
                    </li>
                </ul>
            ) : null }
        </nav>
    )
};

export default Navbar;
