import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './About.css';

const About = () => {
    return (
        <div>
            <Navbar />
            <div className="about-container">
                <h1>About Us</h1>
                <p>Welcome to our website. Here is some information about us...</p>
            </div>
        </div>
    );
};

export default About;