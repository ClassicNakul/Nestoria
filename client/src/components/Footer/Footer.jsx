import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section address">
                    <h4>Address</h4>
                    <p>123 Real Estate St, Suite 100<br />City, State, 12345</p>
                </div>
                <div className="footer-section contact">
                    <h4>Contact</h4>
                    <p>Email: info@realestateplatform.com</p>
                    <p>Phone: 999999999</p>
                </div>
                <div className="footer-section about">
                    <h4>About Us</h4>
                    <p>We are a leading real estate platform dedicated to helping you find your dream home.</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Nestoria. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;