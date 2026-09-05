import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // State for search fields
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  // Function to handle the search button click
  const handleSearch = (e) => {
    e.preventDefault();
    if (from && to && date) {
      // Redirect to the bus search results page with query parameters
      navigate(`/buses?from=${from}&to=${to}&date=${date}`);
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div>
      {/* Hero Section: Main welcome message */}
      <section className="hero-section">
        <h1 className="hero-title">Your Journey<br/>Starts Here.</h1>
        <p className="text-muted" style={{ fontSize: '1.4rem', maxWidth: '700px', margin: '0 auto 60px', fontWeight: '400' }}>
          Experience world-class travel with SwiftBus. Book your next destination with our premium fleet and real-time tracking.
        </p>

        {/* Search Form: The core functionality of the home page */}
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group" style={{ flex: '1.2', minWidth: '240px', marginBottom: '0' }}>
            <label className="form-label">Leaving From</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g. New York" 
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ flex: '1.2', minWidth: '240px', marginBottom: '0' }}>
            <label className="form-label">Going To</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g. Washington D.C." 
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ flex: '1', minWidth: '200px', marginBottom: '0' }}>
            <label className="form-label">Departure</label>
            <input 
              type="date" 
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '16px 40px', boxShadow: '0 10px 20px rgba(99, 102, 241, 0.4)' }}>
            Search Routes
          </button>
        </form>
      </section>

      {/* Features Section: Why use our app */}
      <section className="container" style={{ paddingTop: '80px' }}>
        <h2 className="text-center mb-40" style={{ fontSize: '2.5rem', fontWeight: '800' }}>The SwiftBus Advantage</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          <div className="card text-center">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Secure Booking</h3>
            <p className="text-muted">Industry-leading encryption protecting your personal and payment details every step of the way.</p>
          </div>
          <div className="card text-center">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Fast Updates</h3>
            <p className="text-muted">Never miss a trip. Our real-time notification system keeps you updated on bus locations and timings.</p>
          </div>
          <div className="card text-center">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Easy Refunds</h3>
            <p className="text-muted">Changed your mind? Our one-click cancellation policy ensures a stress-free refund process.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;



