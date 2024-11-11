import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const HeaderComponent = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in by checking a token in localStorage (or other methods)
        const token = sessionStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true);
        }
      }, []);

      const handleLogout = () => {
        // Clear the token (or other authentication info) on logout
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.href = '/login'; // Redirect to login page
      };

  return (
    <div>
      <header>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
          <div>

          {isLoggedIn ? (
              <>
                <NavLink to="/dashboard" className='navbar-brand'>
                  Shopping Cart Application
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/" className='navbar-brand'>
                  Shopping Cart Application
                </NavLink>
              </>
            )}
          </div>
          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav'>
            {isLoggedIn ? (
              <>
              <li className='nav-item'>
                <NavLink to="/ContactUs" className="nav-link">Contact Us</NavLink>
              </li>
              </>
            ) : (
              <></>)}
            </ul>
          </div>
          <ul className='navbar-nav'>
            {isLoggedIn ? (
              <>
              <li className='nav-item'>
                  <NavLink to="/Cart" className="nav-link">View Cart</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: '10px' }}>
                  <NavLink to="/profile" className="nav-link">Profile</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: '10px' }}>
                  <button onClick={handleLogout} className="nav-link btn btn-link">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <NavLink to="/signup" className="nav-link">Register</NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to="/login" className="nav-link">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent