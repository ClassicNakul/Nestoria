import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

const LeftSidebar = () => {
  return (
    <div style={{ width: '200px', padding: '20px', borderRight: '1px solid #ccc' }}>
      <h3>Filters</h3>
      <div>
        <h4>Location</h4>
        <select>
          <option value="">Select Location</option>
          <option value="Jaipur">Jaipur</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Banglore">Banglore</option>
          <option value="Ahmedabad">Ahmedabad</option>
        </select>
      </div>
      <div>
        <h4>Price</h4>
        <select>
          <option value="">Select price range</option>
          <option value="0-50000">0 - 50,000</option>
          <option value="50000-100000">50,000 - 100,000</option>
          <option value="100000-200000">100,000 - 200,000</option>
          <option value="200000-500000">200,000 - 500,000</option>
          <option value="500000+">500,000+</option>
        </select>
      </div>
      <div>
        <h4>Type of Property</h4>
        <select>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
        </select>
      </div>
      <div>
        <h4>Size of Property</h4>
        <select>
          <option value="">Select size</option>
          <option value="2bhk">2 BHK</option>
          <option value="3bhk">3 BHK</option>
          <option value="4bhk">4 BHK</option>
        </select>
      </div>
    </div>
  )
}

const Buy = () => {
  return (
    <div>
      <Navbar />
    <div style={{ display: 'flex' }}>
      <LeftSidebar />
      <div style={{ flex: 1 }}>
      </div>
    </div>
    </div>
  )
}

export default Buy
