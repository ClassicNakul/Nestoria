import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './Home/Home';
import About from './pages/About/About';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sign from './pages/Sign/Sign';
import Contact from './pages/Contact/Contact';
import Buy from './pages/Buy/Buy';
import Sell from './pages/Sell/Sell';
import Rent from './pages/Rent/Rent';
import Renter from './pages/Renter/Renter';
import Loader from './components/Loader/Loader';
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay or wait for data loading here
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/Sign' element={<Sign />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Buy' element={<Buy />} />
          <Route path='/Sell' element={<Sell />} />
          <Route path='/Rent' element={<Rent />} />
          <Route path='/Renter' element={<Renter />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
