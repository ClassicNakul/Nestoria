import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import "./Navbar.css";
import Avatar from "../Avatar/Avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      } else {
        const parsedUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : decodedToken;
        console.log("User:", parsedUser); // Debugging
        console.log("User:", user);
        setUser(parsedUser);
      }
    }
  },[]);
  
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    setUser(null); // Clear user state
    navigate("/sign"); // Redirect to Sign In page
  };

  const toggleNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle("show-navbar");
    }
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={require("../../assets/logo.png")} alt="Logo" />
        </Link>
      </div>
      <ul className="navbar-links" ref={navRef}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/About">About</Link></li>
        <li
          className="dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <span className="dropdown-toggle">Services</span>
          <FaAngleDown />
          <ul className={`dropdown-menu ${isDropdownOpen ? "show-dropdown" : ""}`}>
            <li><Link to="/Buy">To Buy</Link></li>
            <li><Link to="/Sell">To Sell</Link></li>
            <li><Link to="/Rent">To Rent</Link></li>
            <li><Link to="/Renter">To Renter</Link></li>
          </ul>
        </li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li>
          {user ? (
            <>
              <Avatar>
                <Link to={`/Users/${user?.userId || ""}`} style={{ color: "white", textDecoration: "none" }}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : "N"}
                </Link>
              </Avatar>
              <button className="nav-item nav-links logout-btn" onClick={handleLogout}>Sign Out</button>
            </>
          ) : (
            <Link to="/sign" className="sign-in-button">Sign In</Link>
          )}
        </li>
      </ul>
      <button onClick={toggleNavbar} className="menu-button">
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Navbar;
