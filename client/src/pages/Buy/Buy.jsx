import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import image1 from '../../assets/1.jpg';
import image2 from '../../assets/2.jpg';
import image3 from '../../assets/3.jpg';
import image4 from '../../assets/4.jpg';
import image5 from '../../assets/5.jpg';
import image6 from '../../assets/6.jpg';
import image7 from '../../assets/7.jpg';
import image8 from '../../assets/8.jpg';

const LeftSidebar = ({ filters, setFilters }) => {
  const handleClearFilters = () => {
    setFilters({ location: '', price: '', propertyType: '', propertySize: '' });
  };

  return (
    <div
      style={{
        width: '200px',
        padding: '20px',
        borderRight: '1px solid #ccc',
        position: 'fixed',
        top: '60px',
        left: '0',
        height: 'calc(100vh - 60px)',
        backgroundColor: '#fff',
        overflowY: 'auto',
        zIndex: '1000',
      }}
    >
      <h3>Custom Filters</h3>
      <div>
        <h4>Location</h4>
        <select value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })}>
          <option value="">Select Location</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Delhi">Delhi</option>
          <option value="Jaipur">Jaipur</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
        </select>
      </div>
      <div>
        <h4>Price</h4>
        <select value={filters.price} onChange={(e) => setFilters({ ...filters, price: e.target.value })}>
          <option value="">Select price range</option>
          <option value="0-50000">0 - 50,000</option>
          <option value="50000-100000">50,000 - 100,000</option>
          <option value="100000-200000">100,000 - 200,000</option>
          <option value="200000-500000">200,000 - 500,000</option>
          <option value="500000+">500,000+</option>
        </select>
      </div>
      <div>
        <h4>Size of Property</h4>
        <select value={filters.propertyType} onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}>
          <option value="">Select type</option>
          <option value="100sq.ft">100sq.ft</option>
          <option value="200sq.ft">200sq.ft</option>
          <option value="300sq.ft">300sq.ft</option>
        </select>
      </div>
      <div>
        <h4>Type of Property</h4>
        <select value={filters.propertySize} onChange={(e) => setFilters({ ...filters, propertySize: e.target.value })}>
          <option value="">Select size</option>
          <option value="2bhk">2 BHK</option>
          <option value="3bhk">3 BHK</option>
          <option value="4bhk">4 BHK</option>
        </select>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button
          onClick={handleClearFilters}
          style={{
            padding: '8px',
            backgroundColor: 'grey',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
            flex: 1,
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

const Modal = ({ property, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '2000',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          width: '400px',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'red',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
          }}
        >
          X
        </button>
        <h2>Contact Details for {property.title}</h2>
        <p>
          <strong>Location:</strong> {property.location}
        </p>
        <p>
          <strong>Price:</strong> ₹{property.price.toLocaleString()}
        </p>
        <p>
          <strong>Size:</strong> {property.size}
        </p>
        <p>
          <strong>Contact Name:</strong> John Doe
        </p>
        <p>
          <strong>Contact Email:</strong> johndoe@example.com
        </p>
        <p>
          <strong>Contact Phone:</strong> +91-9876543210
        </p>
      </div>
    </div>
  );
};

const Buy = () => {
  const [filters, setFilters] = useState({ location: '', price: '', propertyType: '', propertySize: '' });
  const [selectedProperty, setSelectedProperty] = useState(null);

  const propertyCards = [
    {
      id: 1,
      image: image1,
      title: 'Luxury Villa',
      description: 'A luxurious villa in Mumbai with modern amenities, spacious interiors, and a private garden. Perfect for families seeking comfort and elegance.',
      size: '100sq.ft',
      location: 'Mumbai',
      price: 500000,
    },
    {
      id: 2,
      image: image3,
      title: 'Beach House',
      description: 'A serene beach house in Pune offering stunning views, peaceful surroundings, and spacious living areas. Ideal for a relaxing lifestyle.',
      size: '200sq.ft',
      location: 'Pune',
      price: 200000,
    },
    {
      id: 3,
      image: image4,
      title: 'Hilltop Apartment',
      description: 'An elegant hilltop apartment in Delhi with breathtaking city views, modern interiors, and premium amenities. Perfect for urban professionals.',
      size: '300sq.ft',
      location: 'Delhi',
      price: 400000,
    },
    {
      id: 4,
      image: image2,
      title: 'Modern Apartment',
      description: 'A stylish and modern apartment in Jaipur with contemporary design, spacious rooms, and excellent connectivity. Ideal for families and professionals.',
      size: '300sq.ft',
      location: 'Jaipur',
      price: 100000,
    },
    {
      id: 5,
      image: image5,
      title: 'Cozy Apartment',
      description: 'A cozy 2 BHK apartment in Bangalore with compact yet functional spaces. Perfect for young professionals or small families seeking affordability.',
      size: '150sq.ft',
      location: 'Bangalore',
      price: 300000,
    },
    {
      id: 6,
      image: image6,
      title: 'The Shoreline Villa',
      description: 'A luxurious 4 BHK villa in Ahmedabad featuring a private pool, spacious interiors, and premium amenities. Ideal for upscale living.',
      size: '500sq.ft',
      location: 'Ahmedabad',
      price: 1000000,
    },
    {
      id: 7,
      image: image7,
      title: 'Studio Apartment',
      description: 'A budget-friendly studio apartment in Jaipur with compact design, modern amenities, and excellent location. Perfect for singles or students.',
      size: '50sq.ft',
      location: 'Jaipur',
      price: 150000,
    },
    {
      id: 8,
      image: image8,
      title: '3 BHK Penthouse',
      description: 'A stunning 3 BHK penthouse in Delhi with panoramic city views, rooftop access, and premium interiors. Perfect for luxurious urban living.',
      size: '400sq.ft',
      location: 'Delhi',
      price: 800000,
    },
  ];

  const filteredProperties = propertyCards.filter((property) => {
    const matchesLocation = !filters.location || property.location === filters.location;
    const matchesPrice =
      !filters.price ||
      (filters.price === '500000+' && property.price > 500000) ||
      (filters.price !== '500000+' &&
        property.price >= parseInt(filters.price.split('-')[0]) &&
        property.price <= parseInt(filters.price.split('-')[1]));
    const matchesSize = !filters.propertyType || property.size === filters.propertyType;
    const matchesType = !filters.propertySize || property.title.toLowerCase().includes(filters.propertySize.toLowerCase());

    return matchesLocation && matchesPrice && matchesSize && matchesType;
  });

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <LeftSidebar filters={filters} setFilters={setFilters} />
        <div style={{ marginLeft: '250px', display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', width: '100%' }}>
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              style={{
                position: 'relative',
                display: 'flex',
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '30px',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                alignItems: 'flex-start',
                width: '100%',
                maxWidth: '1000px',
                margin: '0 auto',
                overflow: 'hidden',
              }}
            >
              <img
                src={property.image}
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '10px',
                  marginRight: '30px',
                }}
                alt="Property"
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 15px', fontSize: '1.5rem' }}>{property.title}</h3>
                <p style={{ margin: '0 0 15px', color: '#555', fontSize: '1rem' }}>{property.description}</p>
                <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                  <div style={{ padding: '12px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                    <strong>Size:</strong> {property.size}
                  </div>
                  <div style={{ padding: '12px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                    <strong>Location:</strong> {property.location}
                  </div>
                  <div style={{ padding: '12px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                    <strong>Price:</strong> ₹{property.price.toLocaleString()}
                  </div>
                </div>
                <button
                  style={{
                    position: 'absolute',
                    bottom: '30px',
                    right: '30px',
                    padding: '12px 25px',
                    backgroundColor: 'green',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease', // Smooth transition
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'darkgreen'; // Change background color on hover
                    e.target.style.transform = 'scale(1.05)'; // Slightly enlarge the button
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'green'; // Revert background color
                    e.target.style.transform = 'scale(1)'; // Reset size
                  }}
                  onClick={() => setSelectedProperty(property)}
                >
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProperty && <Modal property={selectedProperty} onClose={() => setSelectedProperty(null)} />}
    </div>
  );
};

export default Buy;