import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Brand Logo/Link */}
      <Link to="/" className="navbar-brand">
        SWIFTBUS
      </Link>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/" className="nav-link">Search</Link>
        
        {/* Conditional rendering based on authentication */}
        {user ? (
          <>
            <Link to="/history" className="nav-link">My Bookings</Link>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px', 
              paddingLeft: '20px', 
              borderLeft: '1px solid rgba(255,255,255,0.1)' 
            }}>
              <span style={{ fontWeight: '600', color: 'white' }}>
                {user.fullName}
              </span>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link to="/login" className="nav-link" style={{ alignSelf: 'center' }}>Login</Link>
            <Link to="/signup" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



