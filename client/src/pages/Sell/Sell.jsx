import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './Sell.css';
import axios from 'axios';
import image9 from '../../assets/9.jpg';
import image7 from '../../assets/7.jpg';
import image8 from '../../assets/8.jpg';
import sampleVideo from '../../assets/vid.mp4';

const Sell = () => {
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    title: '',
    location: '',
    size: '',
    price: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    image: null,
    imageFile: null,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProperty({ ...property, image: URL.createObjectURL(file), imageFile: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in property) {
      if (key !== 'image') {
        formData.append(key, property[key]);
      }
    }

    try {
      await axios.post('http://localhost:4000/api/sell', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Your property has been listed successfully!');
      navigate('/buy');
    } catch (error) {
      console.error(error);
      alert('Failed to list property.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="sell-container">
        <div className="left-section">
          <div className="image-carousel">
            <img src={image9} alt="Property 1" className="carousel-image" />
            <img src={image7} alt="Property 2" className="carousel-image" />
            <img src={image8} alt="Property 3" className="carousel-image" />
          </div>
          <div className="description-container">
            <h2 className="description-title">Why Sell With Us?</h2>
            <p className="description-content">
              List your property with us and reach thousands of potential buyers.
              Our platform ensures maximum visibility for your property, helping you
              connect with serious buyers quickly and efficiently. Provide all the
              details and upload images to showcase your property effectively.
            </p>
            <div className="renter-video">
              <video autoPlay muted loop playsInline width="100%" height="auto">
                <source src={sampleVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
        <div className="right-section">
          <h2 className="sell-title">Sell Your Property</h2>
          <form onSubmit={handleSubmit} className="sell-form">
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  value={property.title}
                  onChange={handleChange}
                  placeholder="Property Name"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="location"
                  value={property.location}
                  onChange={handleChange}
                  placeholder="Location"
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="size"
                  value={property.size}
                  onChange={handleChange}
                  placeholder="Size (e.g., 100sq.ft)"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="price"
                  value={property.price}
                  onChange={handleChange}
                  placeholder="Price"
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="contactName"
                  value={property.contactName}
                  onChange={handleChange}
                  placeholder="Contact Name"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="contactEmail"
                  value={property.contactEmail}
                  onChange={handleChange}
                  placeholder="Contact Email"
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="tel"
                  name="contactPhone"
                  value={property.contactPhone}
                  onChange={handleChange}
                  placeholder="Contact Phone"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="form-input"
                />
              </div>
            </div>

            {/* New Description Field */}
            <div className="form-row">
              <div className="form-group" style={{ width: '100%' }}>
                <textarea
                  name="description"
                  value={property.description}
                  onChange={handleChange}
                  placeholder="Property Description"
                  required
                  className="form-input"
                  rows={4}
                />
              </div>
            </div>

            {property.image && (
              <div className="image-preview-container">
                <img
                  src={property.image}
                  alt="Preview"
                  className="image-preview"
                />
              </div>
            )}

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sell;
