import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Inline styles to replace missing Navbar.css
const styles = {
  navbar: {
    background: 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(6px)',
    borderBottom: '1px solid rgba(0,0,0,0.06)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    fontWeight: 800,
    color: '#111827',
    textDecoration: 'none',
    fontSize: 20
  },
  menu: {
    listStyle: 'none',
    display: 'flex',
    gap: 16,
    margin: 0,
    padding: 0,
    alignItems: 'center'
  },
  link: {
    textDecoration: 'none',
    color: '#374151',
    fontWeight: 600
  },
  btnPrimary: {
    textDecoration: 'none',
    color: '#fff',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '8px 12px',
    borderRadius: 8
  },
  active: {
    color: '#111827'
  }
};

const Navbar = () => {
  const location = useLocation();

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          🍳 FlavorFusion
        </Link>
        <ul style={styles.menu}>
          <li>
            <Link to="/" style={{ ...styles.link, ...(location.pathname === '/' ? styles.active : {}) }}>Discover</Link>
          </li>
          <li>
            <Link to="/favorites" style={{ ...styles.link, ...(location.pathname === '/favorites' ? styles.active : {}) }}>Favorites</Link>
          </li>
          <li>
            <Link to="/add-recipe" style={styles.btnPrimary}>Add Recipe</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;