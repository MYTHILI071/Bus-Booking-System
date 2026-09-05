import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    // State variables for form inputs and status
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Auth context and navigation
    const { register } = useAuth();
    const navigate = useNavigate();

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        // Call register function from AuthContext
        const result = await register(fullName, email, password);
        
        if (result.success) {
            setSuccess(true);
            // Redirect to login after 2 seconds on success
            setTimeout(() => navigate('/login'), 2000);
        } else {
            // Show error message on failure
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="auth-wrapper">
            <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
                <div className="text-center mb-40">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px' }}>Join SwiftBus</h2>
                    <p className="text-muted">Create an account to start your adventure</p>
                </div>

                {/* Error message */}
                {error && (
                    <div className="mb-20" style={{ 
                        background: 'rgba(244, 63, 94, 0.1)', 
                        color: 'var(--accent)', 
                        padding: '15px', 
                        borderRadius: '12px',
                        border: '1px solid rgba(244, 63, 94, 0.2)',
                        textAlign: 'center',
                        fontWeight: '600'
                    }}>
                        {error}
                    </div>
                )}

                {/* Success message */}
                {success && (
                    <div className="mb-20" style={{ 
                        background: 'rgba(16, 185, 129, 0.1)', 
                        color: 'var(--success)', 
                        padding: '15px', 
                        borderRadius: '12px',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        textAlign: 'center',
                        fontWeight: '600'
                    }}>
                        Successfully registered! Redirecting...
                    </div>
                )}

                {/* Signup Form */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="mail@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Min. 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="btn btn-primary btn-full"
                        style={{ marginTop: '10px' }}
                    >
                        {loading ? 'Processing...' : 'Create Account'}
                    </button>
                </form>

                <div className="text-center mt-20" style={{ fontSize: '0.95rem' }}>
                    <span className="text-muted">Already a member?</span>{' '}
                    <Link to="/login" className="text-primary" style={{ fontWeight: '700', textDecoration: 'none' }}>
                        Login here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;



