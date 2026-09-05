import { useState, useEffect } from 'react';
import api from '../services/api';

const BookingHistory = () => {
    // State to store the list of bookings and loading status
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user bookings when the component mounts
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // Call the API to get bookings for the logged-in user
                const response = await api.get('/bookings/user');
                setBookings(response.data.data);
            } catch (err) {
                console.error('Error fetching bookings:', err);
            }
            setLoading(false);
        };
        fetchBookings();
    }, []);

    // Show loading text while data is being fetched
    if (loading) return (
        <div className="container text-center" style={{ padding: '100px 0' }}>
            <div className="mb-20" style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: '600' }}>Retrieving your travel history...</div>
        </div>
    );

    return (
        <div className="container" style={{ maxWidth: '1000px' }}>
            <header className="mb-40">
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px' }}>My Bookings</h2>
                <p className="text-muted" style={{ fontSize: '1.1rem' }}>Manage and view your upcoming and past adventures.</p>
            </header>

            {/* Display message if user has no bookings */}
            {bookings.length === 0 ? (
                <div className="card text-center" style={{ padding: '80px 40px' }}>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>No bookings found</h3>
                    <p className="text-muted">You haven't embarked on any journeys yet. Ready to start your first trip?</p>
                    <button onClick={() => window.location.href = '/'} className="btn btn-primary mt-20">Find a Bus</button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {/* Map through the bookings array to display each ticket */}
                    {bookings.map((booking) => (
                        <div key={booking.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                            {/* Header of the booking card */}
                            <div style={{ 
                                background: 'rgba(255, 255, 255, 0.03)', 
                                padding: '15px 30px', 
                                borderBottom: '1px solid var(--glass-border)', 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                                    <span className="text-muted">BOOKING ID:</span> {booking.bookingId}
                                </span>
                                <span style={{ 
                                    padding: '6px 14px', 
                                    background: 'rgba(16, 185, 129, 0.15)', 
                                    color: 'var(--success)', 
                                    borderRadius: '50px', 
                                    fontSize: '0.75rem', 
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    {booking.status}
                                </span>
                            </div>

                            {/* Details of the booking */}
                            <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', alignItems: 'center' }}>
                                <div>
                                    <label className="form-label" style={{ marginBottom: '8px' }}>Bus / Type</label>
                                    <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>{booking.bus.busName}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600' }}>{booking.bus.busType}</div>
                                </div>

                                <div>
                                    <label className="form-label" style={{ marginBottom: '8px' }}>Route Details</label>
                                    <div style={{ fontWeight: '700' }}>{booking.bus.source} → {booking.bus.destination}</div>
                                    <div className="text-muted" style={{ fontSize: '0.85rem' }}>Departs: {booking.bus.departureTime}</div>
                                </div>

                                <div>
                                    <label className="form-label" style={{ marginBottom: '8px' }}>Journey Date</label>
                                    <div style={{ fontWeight: '700' }}>{new Date(booking.bookingDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                </div>

                                <div style={{ textAlign: 'right' }}>
                                    <label className="form-label" style={{ marginBottom: '8px' }}>Total Amount</label>
                                    <div className="text-success" style={{ fontSize: '2rem', fontWeight: '800', lineHeight: '1', marginBottom: '8px' }}>${booking.totalAmount}</div>
                                    <div style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px', display: 'inline-block' }}>
                                        Seats: {booking.bookedSeats.map(s => s.seatNumber).join(', ')}
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookingHistory;
