import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
        {/* About Section */}
        <div>
          <h3 className="mb-10">SwiftBus</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            Book your bus tickets easily and travel comfortably across the country.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h4 className="mb-10">Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li className="mb-10"><Link to="/" className="text-muted" style={{ textDecoration: 'none' }}>Search Buses</Link></li>
            <li className="mb-10"><Link to="/history" className="text-muted" style={{ textDecoration: 'none' }}>My Bookings</Link></li>
            <li className="mb-10"><Link to="/login" className="text-muted" style={{ textDecoration: 'none' }}>Login</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className="mb-10">Contact Us</h4>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>Email: support@swiftbus.com</p>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>Phone: +1 234 567 890</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-20" style={{ color: '#64748b', fontSize: '0.8rem', borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
        © {new Date().getFullYear()} SwiftBus Ticketing System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;


