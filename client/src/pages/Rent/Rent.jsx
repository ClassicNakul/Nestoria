import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar/Navbar';
import './Rent.css';
import axios from 'axios';

const Rent = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [filteredRentals, setFilteredRentals] = useState([]);

  const [filters, setFilters] = useState({
    location: '',
    size: '',
    price: ''
  });

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/rent');
        setRentals(response.data);
        setFilteredRentals(response.data);
      } catch (err) {
        console.error('Error fetching rentals:', err);
      }
    };

    fetchRentals();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    filterResults(updatedFilters);
  };

  const filterResults = (filterValues) => {
    const filtered = rentals.filter((rental) => {
      const locationMatch =
        filterValues.location === '' ||
        rental.address.toLowerCase().includes(filterValues.location.toLowerCase());

      const sizeMatch = filterValues.size === '' || rental.size === filterValues.size;

      const price = parseFloat(rental.pricePerMonth || 0);
      const maxPrice = filterValues.price ? parseFloat(filterValues.price) : Infinity;
      const priceMatch = price <= maxPrice;

      return locationMatch && sizeMatch && priceMatch;
    });

    setFilteredRentals(filtered);
  };

  return (
    <div>
      <Navbar />
      <motion.div className="rent-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="rent-title">Available Rentals</h2>

        {/* FILTERS */}
        <div className="filter-container">
          <input
            type="text"
            name="location"
            placeholder="Location or sub-location"
            value={filters.location}
            onChange={handleFilterChange}
          />
          <select name="size" value={filters.size} onChange={handleFilterChange}>
            <option value="">All Sizes</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
            <option value="4BHK">4BHK</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Max ₹"
            value={filters.price}
            onChange={handleFilterChange}
          />
        </div>

        {/* RENTAL CARDS */}
        <div className="card-grid">
          {filteredRentals.map((rental) => (
            <motion.div
              key={rental._id}
              className="rental-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img
                src={`http://localhost:4000${rental.image}`}
                alt={rental.title}
                className="rental-image"
              />
              <div className="rental-details">
                <h3>{rental.title}</h3>
                <p>{rental.address}</p>
                <p>{rental.size}</p>
                <p>Price: ₹{rental.pricePerMonth}/month</p>
                <button className="contact-button" onClick={() => setSelectedContact(rental)}>
                  Contact
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CONTACT MODAL */}
      {selectedContact && (
        <div className="modal-overlay" onClick={() => setSelectedContact(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Contact Details</h3>
            <p><strong>Name:</strong> {selectedContact.contactName}</p>
            <p><strong>Email:</strong> {selectedContact.contactEmail}</p>
            <p><strong>Phone:</strong> {selectedContact.contactPhone}</p>
            <button onClick={() => setSelectedContact(null)} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rent;
