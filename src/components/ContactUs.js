import React, { useState, useEffect } from 'react'
import { contactUs } from '../services/AuthService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css files/ContactUs.css';

const ContactUs = () => {

    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    
    function handleContactUs(e){

        e.preventDefault(); // Prevent form submission
        contactUs(email, subject, message)
        .then(response => {

            if (response.data.success) {
                // Redirect to another page, e.g., dashboard
                toast.success(response.data.success);
            } else {
                // Optionally display a message for a failed login attempt
                toast.error(response.data.error);
            }
        })
        .catch(error => {
            toast.error(error.response.data.error);
        })
    }

    return (
        <div className="contact-us-container">
            <ToastContainer />
            <h2>Contact Us</h2>
            <form onSubmit={handleContactUs}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Subject</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <textarea
                        className="form-control"
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group text-center">
                    <button type="submit" className="btn btn-primary">Send</button>
                </div>
            </form>
        </div>
    );
}

export default ContactUs