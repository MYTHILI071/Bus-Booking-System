import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

const BusList = () => {
    // State for storing the list of buses, loading status, and errors
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get search parameters from the URL (e.g., ?from=CityA&to=CityB)
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get('from');
    const to = queryParams.get('to');
    const date = queryParams.get('date');

    // Fetch buses when the component loads or search parameters change
    useEffect(() => {
        const fetchBuses = async () => {
            setLoading(true);
            try {
                // Fetch all buses from the backend API
                const response = await api.get('/buses');
                let allBuses = response.data.data;
                
                // Filter the list if search criteria (from/to) are provided
                if (from && to) {
                    allBuses = allBuses.filter(bus => 
                        bus.source.toLowerCase().includes(from.toLowerCase()) && 
                        bus.destination.toLowerCase().includes(to.toLowerCase())
                    );
                }
                
                setBuses(allBuses);
            } catch (err) {
                setError('Failed to fetch buses. Please try again.');
                console.error(err);
            }
            setLoading(false);
        };

        fetchBuses();
    }, [from, to]);

    // Show loading message while fetching data
    if (loading) {
        return (
            <div className="container text-center" style={{ padding: '100px 0' }}>
                <div className="mb-20" style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: '600' }}>Searching available routes...</div>
                <p className="text-muted">Directing you to the best travel options</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            <header className="mb-40">
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px' }}>Available Buses</h2>
                <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                    {from && to ? (
                        <>Showing results for <span className="text-primary" style={{ fontWeight: '700' }}>{from}</span> to <span className="text-primary" style={{ fontWeight: '700' }}>{to}</span> on {date}</>
                    ) : 'Showing all available routes for your next journey'}
                </p>
            </header>

            {/* Error message if something goes wrong */}
            {error && (
                <div className="mb-20" style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                    {error}
                </div>
            )}

            {/* Display "No buses found" if list is empty */}
            {buses.length === 0 ? (
                <div className="card text-center" style={{ padding: '60px 40px' }}>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>No routes found</h3>
                    <p className="text-muted">We couldn't find any buses matching your specific criteria. Try adjusting your search.</p>
                    <button onClick={() => navigate('/')} className="btn btn-primary mt-20">Modify Search</button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Map through the buses array to display each bus */}
                    {buses.map((bus) => (
                        <div key={bus.id} className="bus-card">
                            <div style={{ flex: '1' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                                    <h3 style={{ margin: '0', fontSize: '1.5rem', fontWeight: '800' }}>{bus.busName}</h3>
                                    <span style={{ padding: '4px 12px', background: 'var(--primary-glow)', color: 'white', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>
                                        {bus.type}
                                    </span>
                                </div>
                                
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>{new Date(bus.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        <div className="text-muted" style={{ fontSize: '0.85rem' }}>{bus.source}</div>
                                    </div>
                                    <div style={{ flex: '1', height: '2px', background: 'linear-gradient(to right, var(--primary), transparent)', position: 'relative' }}>
                                        <div style={{ position: 'absolute', top: '-4px', right: '0', width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '50%' }}></div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>{new Date(bus.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        <div className="text-muted" style={{ fontSize: '0.85rem' }}>{bus.destination}</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ textAlign: 'right', paddingLeft: '40px', borderLeft: '1px solid var(--glass-border)' }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Per Seat</div>
                                <div className="text-success" style={{ fontSize: '2.2rem', fontWeight: '800', lineHeight: '1', marginBottom: '20px' }}>
                                    ${bus.price}
                                </div>
                                <button 
                                    onClick={() => navigate(`/seat-select/${bus.id}`)}
                                    className="btn btn-primary"
                                    style={{ width: '140px' }}
                                >
                                    Select Seats
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BusList;



