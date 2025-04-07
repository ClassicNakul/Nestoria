import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './Buy.css';

const Buy = () => {
  const location = useLocation();
  const newProperty = location.state?.newProperty;

  const [selectedContact, setSelectedContact] = useState(null);
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    price: '',
    size: '',
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/buy');
        const data = await response.json();

        let updatedProperties = data;
        if (newProperty) {
          updatedProperties = [{ ...newProperty, _id: Date.now() }, ...data];
        }

        setProperties(updatedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [newProperty]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = (property) => {
    const price = parseInt(property.price.replace(/\D/g, ''));
    const size = parseInt(property.size.replace(/\D/g, ''));

    const [minPrice, maxPrice] = filters.price
      ? filters.price.split('-').map(Number)
      : [0, Infinity];
    const [minSize, maxSize] = filters.size
      ? filters.size.split('-').map(Number)
      : [0, Infinity];

    return (
      (!filters.location || property.location.includes(filters.location)) &&
      price >= minPrice && price <= maxPrice &&
      size >= minSize && size <= maxSize
    );
  };

  return (
    <div>
      <Navbar />
      <div className="buy-container">
        <h2 className="buy-title">Available Properties</h2>

        {/* Filter Dropdowns */}
        <div className="filters">
          <select name="location" value={filters.location} onChange={handleFilterChange}>
            <option value="">All Locations</option>
            <option value="Pune">Pune</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Ahemdabad">Ahemdabad</option>
            <option value="Bangalore">Bangalore</option>
          </select>

          <select name="price" value={filters.price} onChange={handleFilterChange}>
            <option value="">All Prices</option>
            <option value="0-1000000">Under 10,00,000</option>
            <option value="1000000-5000000">10,00,000 - 50,00,000</option>
            <option value="5000000-999999999">Over 50,00,000</option>
          </select>

          <select name="size" value={filters.size} onChange={handleFilterChange}>
            <option value="">All Sizes</option>
            <option value="0-1000">Under 1000 sq.ft</option>
            <option value="1000-2000">1000 - 2000 sq.ft</option>
            <option value="2000-999999">Over 2000 sq.ft</option>
          </select>
        </div>

        <div className="card-grid">
          {properties.filter(applyFilters).map((property) => (
            <div key={property._id} className="property-card">
              <img
                src={property.image?.startsWith('/uploads')
                  ? `http://localhost:4000${property.image}`
                  : property.image}
                alt={property.title}
                className="property-image"
              />
              <div className="property-details">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-location">{property.location}</p>
                <p className="property-size">Size: {property.size}</p>
                <p className="property-price">Price: {property.price}</p>
                <p className="property-description">{property.description}</p>
                <button
                  className="contact-button"
                  onClick={() => setSelectedContact(property)}
                >
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedContact && (
        <div className="modal-overlay" onClick={() => setSelectedContact(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Contact Details</h3>
            <p><strong>Name:</strong> {selectedContact.contactName}</p>
            <p><strong>Email:</strong> {selectedContact.contactEmail}</p>
            <p><strong>Phone:</strong> {selectedContact.contactPhone}</p>
            <button onClick={() => setSelectedContact(null)} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;
