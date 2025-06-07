import React, { useState } from 'react';
import "./NewSignup.css" // Updated CSS import
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import NewNavbar from './NewNavBar';

const NewSignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !email || !password) {
            setError("All fields are required");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/auth/signup', {
                username,
                email,
                password,
            });

            if (response.data.status) {
                navigate("/newlogin");
            } else {
                setError(response.data.message || "Signup failed");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error during signup");
        }
    };

    return (
        <>
        <NewNavbar/>
        <div className="newsignup-container">
            <form className="newsignup-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                {error && <p className="newsignup-error">{error}</p>}
                <label>Username:</label>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                
                <label>Email:</label>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                
                <label>Password:</label>
                <input type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link to="/newlogin">Login</Link></p>
            </form>
        </div>
        </>
    );
};

export default NewSignUp;
