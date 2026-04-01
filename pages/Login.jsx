import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    // State variables for form inputs and status
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Auth context and navigation
    const { login } = useAuth();
    const navigate = useNavigate();

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        // Call the login function from AuthContext
        const result = await login(email, password);
        
        if (result.success) {
            // Redirect to home page on success
            navigate('/');
        } else {
            // Show error message on failure
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="auth-wrapper">
            <div className="card" style={{ width: '100%', maxWidth: '450px' }}>
                <div className="text-center mb-40">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px' }}>Welcome Back</h2>
                    <p className="text-muted">Enter your details to continue your journey</p>
                </div>

                {/* Error message display */}
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

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
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
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="btn btn-primary btn-full"
                        style={{ marginTop: '10px' }}
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div className="text-center mt-20" style={{ fontSize: '0.95rem' }}>
                    <span className="text-muted">New traveler?</span>{' '}
                    <Link to="/signup" className="text-primary" style={{ fontWeight: '700', textDecoration: 'none' }}>
                        Create an account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;



