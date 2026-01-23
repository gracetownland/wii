import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useContent } from '../contexts/ContentContext';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import videoBackground from '../img/SiyaDwi.mov';
import './Admin.css';

function AdminDashboard() {
    const { logout, user } = useAuth();
    const { content, updateContent, loading } = useContent();
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    // Local form state
    const [landingForm, setLandingForm] = useState({
        title: '',
        subtitle: '',
        welcomeText: ''
    });

    const [aboutForm, setAboutForm] = useState({
        heading: '',
        bio: ''
    });

    // Update local state when content loads
    useEffect(() => {
        if (!loading) {
            setLandingForm({
                title: content.landing?.title || '',
                subtitle: content.landing?.subtitle || '',
                welcomeText: content.landing?.welcomeText || ''
            });
            setAboutForm({
                heading: content.about?.heading || '',
                bio: content.about?.bio || ''
            });
        }
    }, [content, loading]);

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const handleSaveLanding = async () => {
        setSaving(true);
        setMessage('');
        const result = await updateContent('landing', landingForm);
        if (result.success) {
            setMessage('Landing page content saved!');
        } else {
            setMessage('Error: ' + result.error);
        }
        setSaving(false);
    };

    const handleSaveAbout = async () => {
        setSaving(true);
        setMessage('');
        const result = await updateContent('about', aboutForm);
        if (result.success) {
            setMessage('About page content saved!');
        } else {
            setMessage('Error: ' + result.error);
        }
        setSaving(false);
    };

    const handleImageUpload = async (e, section, field) => {
        const file = e.target.files[0];
        if (!file) return;

        setSaving(true);
        setMessage('Uploading image...');

        try {
            const storageRef = ref(storage, `images/${section}/${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);

            await updateContent(section, { [field]: url });
            setMessage('Image uploaded successfully!');
        } catch (error) {
            setMessage('Error uploading: ' + error.message);
        }
        setSaving(false);
    };

    const videoUrl = content.landing?.videoUrl || videoBackground;

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="loading-spinner"></div>
                <p>Loading content...</p>
            </div>
        );
    }

    return (
        <div className="backgroundContainer">
            <video autoPlay loop muted className="backgroundVideo">
                <source src={videoUrl} type="video/mp4" />
            </video>
            <div className="admin-overlay-content">
                <div className="admin-dashboard">
                    <header className="admin-header">
                        <h1>Admin Dashboard</h1>
                        <div className="admin-header-right">
                            <span className="admin-user">{user?.email}</span>
                            <button onClick={handleLogout} className="admin-logout-btn">
                                Logout
                            </button>
                        </div>
                    </header>

                    {message && <div className="admin-message">{message}</div>}

                    <main className="admin-content">
                        {/* Landing Page Section */}
                        <section className="admin-section">
                            <h2>Landing Page</h2>
                            <div className="admin-form-group">
                                <label>Title (First Name)</label>
                                <input
                                    type="text"
                                    value={landingForm.title}
                                    onChange={(e) => setLandingForm({ ...landingForm, title: e.target.value })}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Subtitle (Last Name)</label>
                                <input
                                    type="text"
                                    value={landingForm.subtitle}
                                    onChange={(e) => setLandingForm({ ...landingForm, subtitle: e.target.value })}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Welcome Text</label>
                                <textarea
                                    value={landingForm.welcomeText}
                                    onChange={(e) => setLandingForm({ ...landingForm, welcomeText: e.target.value })}
                                    rows={3}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Background Video</label>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => handleImageUpload(e, 'landing', 'videoUrl')}
                                />
                                {content.landing?.videoUrl && (
                                    <p className="admin-current-file">Current: Video uploaded ✓</p>
                                )}
                            </div>
                            <button
                                onClick={handleSaveLanding}
                                className="admin-save-btn"
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save Landing Page'}
                            </button>
                        </section>

                        {/* About Page Section */}
                        <section className="admin-section">
                            <h2>About Page</h2>
                            <div className="admin-form-group">
                                <label>Heading</label>
                                <input
                                    type="text"
                                    value={aboutForm.heading}
                                    onChange={(e) => setAboutForm({ ...aboutForm, heading: e.target.value })}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Bio</label>
                                <textarea
                                    value={aboutForm.bio}
                                    onChange={(e) => setAboutForm({ ...aboutForm, bio: e.target.value })}
                                    rows={6}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Profile Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'about', 'imageUrl')}
                                />
                                {content.about?.imageUrl && (
                                    <img
                                        src={content.about.imageUrl}
                                        alt="Current profile"
                                        className="admin-preview-image"
                                    />
                                )}
                            </div>
                            <button
                                onClick={handleSaveAbout}
                                className="admin-save-btn"
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save About Page'}
                            </button>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
