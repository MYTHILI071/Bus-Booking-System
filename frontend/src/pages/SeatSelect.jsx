import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const SeatSelect = () => {
  const { busId } = useParams();
  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch bus details and seat availability on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bus and seats in parallel
        const [busRes, seatsRes] = await Promise.all([
          api.get(`/buses/${busId}`),
          api.get(`/seats/${busId}`)
        ]);
        setBus(busRes.data.data);
        setSeats(seatsRes.data.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
      setLoading(false);
    };
    fetchData();
  }, [busId]);

  // Function to select/deselect a seat
  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      // Remove seat if already selected
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      // Add seat to selection
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  // Function to confirm booking
  const handleBooking = async () => {
    if (selectedSeats.length === 0) return;
    setBookingLoading(true);
    try {
      // Send booking request to backend
      await api.post('/bookings', {
        busId: parseInt(busId),
        seatIds: selectedSeats
      });
      setShowSuccess(true);
      // Wait 3 seconds then redirect to history
      setTimeout(() => navigate('/history'), 3000);
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Booking failed. Please try again.');
    }
    setBookingLoading(false);
  };

  if (loading) return (
    <div className="container text-center" style={{ padding: '100px 0' }}>
      <div className="mb-20" style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: '600' }}>Preparing seat layout...</div>
    </div>
  );

  // Calculate total price based on selected seats
  const totalPrice = selectedSeats.length * (seats[0]?.price || 0);

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn btn-danger mb-40">
        ← Back to Search
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px', alignItems: 'start' }}>
        
        {/* Seat Layout Section */}
        <div className="card">
          <div className="text-center mb-40">
            <h3 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '4px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '15px' }}>
              FRONT OF BUS
            </h3>
          </div>
          
          <div className="seat-grid" style={{ maxWidth: '400px', margin: '0 auto' }}>
            {seats.map((seat) => {
              const isSelected = selectedSeats.includes(seat.id);
              const isBooked = seat.booked;
              
              return (
                <button
                  key={seat.id}
                  onClick={() => !isBooked && toggleSeat(seat.id)}
                  disabled={isBooked}
                  className="seat-item"
                  style={{
                    background: isBooked ? 'rgba(255,255,255,0.05)' : isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.02)',
                    color: isBooked ? 'rgba(255,255,255,0.1)' : 'white',
                    borderColor: isSelected ? 'var(--primary)' : isBooked ? 'transparent' : 'var(--glass-border)',
                    cursor: isBooked ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    transform: isSelected ? 'scale(1.05)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>{seat.seatNumber}</div>
                  <div style={{ fontSize: '0.6rem', opacity: '0.7' }}>{isBooked ? 'Occupied' : isSelected ? 'Selected' : 'Available'}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-20" style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '0.8rem', borderTop: '1px solid var(--glass-border)', paddingTop: '30px', marginTop: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}></span>Available</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '3px' }}></span>Selected</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', opacity: 0.3 }}></span>Booked</div>
          </div>
        </div>

        {/* Booking Summary Section */}
        <div className="card" style={{ position: 'sticky', top: '100px' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '25px' }}>Summary</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted">Bus Name</span>
              <span style={{ fontWeight: '700' }}>{bus?.busName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted">Route</span>
              <span style={{ fontWeight: '700' }}>{bus?.source} → {bus?.destination}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted">Selected Seats</span>
              <span style={{ fontWeight: '700' }}>{selectedSeats.length > 0 ? selectedSeats.length : 'None'}</span>
            </div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '24px', borderRadius: '16px', marginBottom: '30px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <div className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '4px' }}>Total Amount</div>
            <h2 className="text-success" style={{ margin: '0', fontSize: '2.5rem', fontWeight: '800' }}>${totalPrice}</h2>
          </div>

          <button 
            onClick={handleBooking}
            disabled={selectedSeats.length === 0 || bookingLoading}
            className="btn btn-primary btn-full"
            style={{ fontSize: '1.1rem', padding: '18px' }}
          >
            {bookingLoading ? 'Processing Booking...' : 'Confirm Reservation'}
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="card text-center" style={{ maxWidth: '450px', transform: 'scale(1.1)' }}>
            <div style={{ width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifySelf: 'center', marginBottom: '24px', margin: '0 auto 24px' }}>
               <span style={{ color: 'var(--success)', fontSize: '2.5rem' }}>✓</span>
            </div>
            <h2 className="text-success" style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px' }}>Tickets Booked!</h2>
            <p className="text-muted" style={{ fontSize: '1.1rem' }}>Your journey is now confirmed. Redirecting you to your bookings history...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelect;



