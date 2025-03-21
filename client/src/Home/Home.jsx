import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

const Home = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const images = [
        require("../assets/1.jpg"),
        require("../assets/2.jpg"),
        require("../assets/7.jpg"),
    ];

    // Sample data for best properties
    const bestProperties = [
        {
            id: 1,
            image: require("../assets/1.jpg"),
            name: "Luxury Villa",
            rating: 4.5,
            review: "Amazing property with great views!",
        },
        {
            id: 2,
            image: require("../assets/2.jpg"),
            name: "Modern Apartment",
            rating: 4.7,
            review: "Perfect location and spacious rooms.",
        },
        {
            id: 3,
            image: require("../assets/3.jpg"),
            name: "Beach House",
            rating: 4.9,
            review: "Beautiful beachfront property.",
        },
        {
            id: 4,
            image: require("../assets/4.jpg"),
            name: "Countryside Cottage",
            rating: 4.3,
            review: "Peaceful and cozy retreat.",
        },
        {
            id: 5,
            image: require("../assets/5.jpg"),
            name: "Serenity Heights",
            rating: 4.1,
            review: "Elegant, tranquil, luxurious, scenic, memorable.",
        },
        {
            id: 6,
            image: require("../assets/6.jpg"),
            name: "The Shoreline Spot",
            rating: 4.7,
            review: "Peaceful and cozy retreat.",
        },
        {
            id: 7,
            image: require("../assets/9.jpg"),
            name: "Ocean Residence",
            rating: 4.8,
            review: "Nice view of the ocean.",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div>
            <Navbar />
            <div className="home-container">
                {/* Image Slider Section */}
                <div className="image-container">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Background ${index + 1}`}
                            className={index === currentImage ? 'active' : ''}
                        />
                    ))}
                    <div className="overlay-text">
                        <h1>Welcome to Nestoria</h1>
                        <p>Find Your Dream Home with Nestoria!</p>
                    </div>
                </div>

                {/* Services Section */}
                <div className="services-container">
                    <h2>Our Services</h2>
                    <p>At Nestoria, we provide a seamless and hassle-free real estate experience. Whether you are looking to buy, sell, or rent a property, our expert team is here to guide you every step of the way. Our platform offers comprehensive property listings, professional valuation services, and tailored support to help you make the best real estate decisions.</p>
                    <div className="services-grid">
                        <div className="service-card">
                            <h3>Buy</h3>
                            <p>Find your dream home to buy.</p>
                            <Link to="/buy" className="service-link">Explore</Link>
                        </div>
                        <div className="service-card">
                            <h3>Sell</h3>
                            <p>Sell your property with ease.</p>
                            <Link to="/sell" className="service-link">Explore</Link>
                        </div>
                        <div className="service-card">
                            <h3>Rent</h3>
                            <p>Rent a property for your needs.</p>
                            <Link to="/rent" className="service-link">Explore</Link>
                        </div>
                        <div className="service-card">
                            <h3>Rentee</h3>
                            <p>List your property for rent.</p>
                            <Link to="/rentee" className="service-link">Explore</Link>
                        </div>
                    </div>
                </div>

                {/* Best Properties Section */}
                <div className="best-properties-container">
                    <h2>Our Best Properties</h2>
                    <div className="properties-slider">
                        {bestProperties.map((property) => (
                            <div key={property.id} className="property-card">
                                <img src={property.image} alt={property.name} />
                                <h3>{property.name}</h3>
                                <div className="rating">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span
                                            key={i}
                                            className={`star ${i < Math.round(property.rating) ? 'filled' : ''}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                    <span className="rating-value">{property.rating}</span>
                                </div>
                                <p className="review">{property.review}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
