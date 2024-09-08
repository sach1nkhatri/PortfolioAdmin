import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword
import { auth } from '../FirebaseConfig'; // Import the Firebase auth object
import '../css/Login.css';

const TypingAnimation = () => {
    return (
        <div className="typing-animation">
            <h1>Welcome to Your Portfolio Backend</h1>
        </div>
    );
};

const LoginPage = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // If successful, redirect to the dashboard
            navigate('/dashboard');
        } catch (error) {
            // Handle authentication errors
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <TypingAnimation />
            <img src={require('../assets/sk.jpg')} alt="Account" className="top-image" />
            <form id="loginForm" onSubmit={handleLogin}>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <input
                        type="email"
                        id="username"
                        name="username"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit" id="loginBtn">Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
