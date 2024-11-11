import React, { useState, useEffect } from 'react'
import { loginAPICall } from '../services/AuthService';
import './css files/LoginPage.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginComponent = () => {

    useEffect(() => {
        // Check if there's a success message in sessionStorage
        const successMessage = sessionStorage.getItem('successMessage');
        
        if (successMessage) {
            // Display the success message
            toast.success(successMessage);

            // Remove the message from sessionStorage
            sessionStorage.removeItem('successMessage');
        }
    }, []);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    function handleLoginForm(e){

        e.preventDefault();

        loginAPICall(username, password).then((response) => {
            console.log(response.data);

            // Assuming the response contains some success indicator
            if (response.data.success) {
                // Redirect to another page, e.g., dashboard
                const token = response.data.token; // Extract token from response
                sessionStorage.setItem('token', token); // Store token in localStorage
                window.location.href = '/dashboard';
            } else {
                // Optionally display a message for a failed login attempt
                toast.error("Invalid Credentials");
                const responseOutput = document.querySelector('error');
                responseOutput.textContent = 'Login failed. Please try again.';
            }

        }).catch(error => {
            if (error.response && error.response.status === 401) {
                toast.error("Username/Password is wrong"); // 401 Unauthorized
            } else {
                console.error("An error occurred:", error);
                toast.error("An unexpected error occurred. Please try again later.");
            }
        })

    }

    return (
        <div className='login-container'>
            <ToastContainer></ToastContainer>
            <div className='card login-card shadow'>
                <div className='card-header text-center'>
                    <h2>Welcome Back</h2>
                    <p>Please login to your account</p>
                </div>
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-4'>
                            <label className='form-label'>Username or Email</label>
                            <input
                                type='text'
                                name='username'
                                className='form-control'
                                placeholder='Enter username or email'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className='form-group mb-4'>
                            <label className='form-label'>Password</label>
                            <input
                                type='password'
                                name='password'
                                className='form-control'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className='form-group mb-4 d-flex justify-content-between'>
                            <div className='form-check'>
                                <input type='checkbox' className='form-check-input' id='rememberMe' />
                                <label className='form-check-label' htmlFor='rememberMe'>Remember Me</label>
                            </div>
                            <a href='#' className='forgot-password'>Forgot Password?</a>
                        </div>

                        <div className='form-group text-center'>
                            <button className='btn btn-primary btn-block' onClick={(e) => handleLoginForm(e)}>Login</button>
                        </div>
                    </form>
                </div>
                <div className='card-footer text-center'>
                    <p>Don't have an account? <a href='/signup'>Sign up</a></p>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent