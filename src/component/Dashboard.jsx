// src/components/Dashboard.jsx

import React from 'react';
import Header from './header'; // Import the Header component
import Footer from './footer'; // Import the Footer component
import '../css/Dashboard.css';
import {Link} from "react-router-dom"; // Import the CSS file for dashboard styles

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <Header />
            <main className="dashboard-content">
                <div className="card-container">
                    <div className="card">
                        <h2><Link to="/blog">Blog</Link></h2>
                        <p>Manage your blog posts here.</p>
                    </div>
                    <div className="card">
                        <h2><Link to="/work">Work</Link></h2>
                        <p>View and manage your work-related tasks.</p>
                    </div>
                    <div className="card">
                        <h2><Link to="/messages">Messages</Link></h2>
                        <p>Check your messages and notifications.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
