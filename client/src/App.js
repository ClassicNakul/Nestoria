import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './Home/Home';
import About from './pages/About/About';
import Footer from './components/Footer/Footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Sign from './pages/Sign/Sign';
import Contact from './pages/Contact/Contact';
import Buy from './pages/Buy/Buy';
import Sell from './pages/Sell/Sell';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
            <Routes>
                <Route path='/About' element={<About />}/>
                <Route path='/' element={<Home />}/>
                <Route path='/Sign' element={<Sign />}/>
                <Route path='/Contact' element={<Contact />}/>
                <Route path='/Buy' element={<Buy />}/>
                <Route path='/Sell' element={<Sell />}/>
            </Routes>
        {/* <Footer />   */}
      </Router>
    </div>
  );
} 

export default App;
