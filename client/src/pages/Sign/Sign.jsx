import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Sign.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from 'axios';

const Sign = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignUp ? 'http://localhost:4000/signup' : 'http://localhost:4000/login';
    const payload = isSignUp ? { name, email, password } : { email, password };

    try {
        const { data } = await axios.post(url, payload);
        alert(isSignUp ? 'Signup Successful' : 'Login Successful');
        if (!isSignUp) {
            localStorage.setItem('token', data.token);
            navigate("/Home"); // Redirect to Home page
        }
    } catch (err) {
        alert('Error: ' + (err.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <div className="gb">
      <Navbar />
      <div className="container">
        <motion.div
          className="box"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={`form-container ${isSignUp ? "signup" : "login"}`}
            animate={{ x: isSignUp ? "0%" : "-100%" }}
            transition={{ duration: 0.5 }}
          >
            <h2>{isSignUp ? "Sign Up" : "Login"}</h2>

            <form onSubmit={handleSubmit}>
              {isSignUp && <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} className="input" />}
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="input" />
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="input" />
              <button type="submit" className="btn">{isSignUp ? "Sign Up" : "Login"}</button>
            </form>
          </motion.div>

          <motion.div
            className="toggle-panel"
            animate={{ x: isSignUp ? "0%" : "100%" }}
            transition={{ duration: 0.5 }}
          >
            <p>{isSignUp ? "Already have an account?" : "Don't have an account?"}</p>
            <button onClick={toggleForm} className="toggle-btn">
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sign;