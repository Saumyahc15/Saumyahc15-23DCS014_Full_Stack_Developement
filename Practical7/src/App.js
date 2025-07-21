import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <Router>
      <div className="app">
        <button className="menu-btn" onClick={toggleSidebar}>
          &#9776;
        </button>

        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          <button className="menu-btn close" onClick={toggleSidebar}>
            &#9776;
          </button>
          <ul>
            <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
            <li><Link to="/about" onClick={toggleSidebar}>About</Link></li>
            <li><Link to="/contact" onClick={toggleSidebar}>Contact</Link></li>
          </ul>
        </div>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Page Components
const Home = () => (
  <>
    <h1>Welcome to My Website</h1>
    <p>This is the main content of the webpage.</p>
  </>
);

const About = () => (
  <>
    <h1>About Us</h1>
    <p>This is the About Us page.</p>
  </>
);

const Contact = () => (
  <>
    <h1>Contact Us</h1>
    <p>This is the Contact Us page.</p>
  </>
);

export default App;
