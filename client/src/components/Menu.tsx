import React from 'react';
import { Link } from 'react-router-dom';

export const Menu = () => {
    return (
        <div className="navbar">
            <div className="navbar-logo-title">
                <i className="fas fa-video"></i>
                <h2><Link to="/" className="link">Mflix</Link></h2>
            </div>
            <div className="navbar-menu">
                <ul>
                    <li><Link to="/search" className='link'>Search</Link></li>
                    <li><Link to="/movie2" className='link'>More Movies</Link></li>
                    <li><Link to="/movieList" className='link'>My Movie List</Link></li>
                    <li><Link to="/login/bulletin" className='link'>Bulletin</Link></li>
                </ul>
            </div>
        </div>
    )
}
