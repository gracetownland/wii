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
    const [resetMessage, setResetMessage] = useState('');
    const [isResetting, setIsResetting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login, resetPassword } = useAuth();
    const { content } = useContent();
    const navigate = useNavigate();

    // Use the same video from landing page content if available, else default
    const videoUrl = content.landing?.videoUrl || videoBackground;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResetMessage('');
        setLoading(true);

        if (isResetting) {
            const result = await resetPassword(email);
            if (result.success) {
                setResetMessage('Check your email for password reset instructions.');
            } else {
                setError(result.error);
            }
        } else {
            const result = await login(email, password);
            if (result.success) {
                navigate('/admin');
            } else {
                setError(result.error);
            }
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
                        {resetMessage && <div className="admin-message">{resetMessage}</div>}

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


                        {!isResetting && (
                            <div className="admin-form-group">
                                <section style={{ position: 'relative' }}>
                                    <label htmlFor="password">Password</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="••••••••"
                                            style={{ paddingRight: '40px' }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: 'var(--yellow, yellow)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: 0
                                            }}
                                        >
                                            {showPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </section>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="admin-submit-btn"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : (isResetting ? 'Reset Password' : 'Sign In')}
                        </button>


                        <button
                            type="button"
                            className="admin-text-btn"
                            onClick={() => {
                                setIsResetting(!isResetting);
                                setError('');
                                setResetMessage('');
                            }}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'yellow',
                                marginTop: '15px',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                fontSize: '0.9rem',
                                width: '100%'
                            }}
                        >
                            {isResetting ? 'Back to Login' : 'Forgot Password?'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
