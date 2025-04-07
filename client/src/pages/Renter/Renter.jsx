import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import './Renter.css';
import image1 from '../../assets/6.jpg';
import image2 from '../../assets/11.jpg';
import image3 from '../../assets/10.jpg';
import sampleVideo from '../../assets/video.mp4'; // add your video here

const Renter = () => {
    const navigate = useNavigate();
    const [rental, setRental] = useState({
        title: '',
        address: '',
        size: '',
        price: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        image: null,
        imageFile: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRental({ ...rental, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setRental({ ...rental, image: URL.createObjectURL(file), imageFile: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in rental) {
            if (key !== 'image') {
                formData.append(key, rental[key]);
            }
        }

        try {
            await axios.post('http://localhost:4000/api/rent', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Rental property listed successfully!');
            navigate('/rent');
        } catch (err) {
            console.error(err);
            alert('Failed to list rental.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="renter-wrapper">
                {/* LEFT SIDE */}
                <div className="renter-left">
                    <div className="renter-description">
                        <h2>Why List Your Rental With Us?</h2>
                        <p>
                            Connect with hundreds of potential renters actively searching for homes.
                            Our platform maximizes your property’s visibility with a sleek listing experience.
                        </p>

                        <div className="renter-images">
                            <img src={image1} alt="showcase 1" />
                            <img src={image2} alt="showcase 2" />
                            <img src={image3} alt="showcase 3" />
                        </div>

                        <div className="renter-video">
                            <video autoPlay muted loop playsInline width="100%" height="auto">
                                <source src={sampleVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="renter-form-container">
                    <form onSubmit={handleSubmit} className="renter-form">
                        <input
                            type="text"
                            name="title"
                            placeholder="Property Title"
                            value={rental.title}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={rental.address}
                            onChange={handleChange}
                            required
                        />
                        <select
                            name="size"
                            value={rental.size}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Size</option>
                            <option value="1BHK">1BHK</option>
                            <option value="2BHK">2BHK</option>
                            <option value="3BHK">3BHK</option>
                            <option value="4BHK">4BHK</option>
                        </select>
                        <input
                            type="number"
                            name="price"
                            placeholder="Price Per Month"
                            value={rental.price}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="contactName"
                            placeholder="Contact Name"
                            value={rental.contactName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="contactEmail"
                            placeholder="Contact Email"
                            value={rental.contactEmail}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="tel"
                            name="contactPhone"
                            placeholder="Contact Phone"
                            value={rental.contactPhone}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                        {rental.image && (
                            <img src={rental.image} alt="Preview" className="image-preview" />
                        )}
                        <button type="submit" className="submit-button">
                            Submit Listing
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Renter;
