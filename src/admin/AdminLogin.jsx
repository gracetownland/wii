import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import videoBackground from '../img/SiyaDwi.mov';
import { useContent } from '../contexts/ContentContext';
import './Admin.css';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { content, loading: contentLoading } = useContent();
    const navigate = useNavigate();

    // Use the same video from landing page content if available, else default
    const videoUrl = content.landing?.videoUrl || videoBackground;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/admin');
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="backgroundContainer">
            <video autoPlay loop muted className="backgroundVideo">
                <source src={videoUrl} type="video/mp4" />
            </video>
            <div className="admin-overlay-content">
                <div className="admin-login-card">
                    <h1>Admin Login</h1>
                    <form onSubmit={handleSubmit}>
                        {error && <div className="admin-error">{error}</div>}

                        <div className="admin-form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="admin@example.com"
                            />
                        </div>

                        <div className="admin-form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="admin-submit-btn"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
