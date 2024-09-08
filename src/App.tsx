import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './component/LoginPage'; // Import the LoginPage component
import Dashboard from './component/Dashboard';  // Import the Dashboard component
import Messages from './component/Messages'; // Import the Messages component

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/messages" element={<Messages />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
