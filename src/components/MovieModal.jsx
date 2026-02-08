import React, { useState, useEffect } from 'react';

const MovieModal = ({
    movie,
    movieDetails,
    loading,
    onClose,
    modalStyle
}) => {
    const [isClosing, setIsClosing] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Disable body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const generateCalendarLink = () => {
        if (!selectedDate || !selectedTime || !movie) return;

        const startDateTime = new Date(`${selectedDate}T${selectedTime}`);
        const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);

        const formatDateTime = (date) => {
            return date.toISOString().replace(/-|:|\.\d{3}/g, '');
        };

        const title = encodeURIComponent(`🎬 Movie Date: ${movie.title}`);
        const details = encodeURIComponent(`Valentine's Day Movie Night!\n\nWe're watching: ${movie.title}\n\nGet the popcorn ready! 🍿❤️`);
        const guests = encodeURIComponent('siyadwi@gmail.com,speak2ayushsrihari@gmail.com');

        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDateTime(startDateTime)}/${formatDateTime(endDateTime)}&details=${details}&add=${guests}`;

        window.open(calendarUrl, '_blank');
        setShowConfirmation(true);
    };

    return (
        <div
            className={`modal-overlay ${isClosing ? 'closing' : ''}`}
            onClick={handleClose}
            style={modalStyle}
        >
            <div
                className={`modal-content schedule-modal ${isClosing ? 'closing' : ''}`}
                onClick={e => e.stopPropagation()}
            >
                <button className="modal-close-x" onClick={handleClose}>×</button>
                {loading ? (
                    <p>Loading movie details...</p>
                ) : !showConfirmation ? (
                    <>
                        <div className="movie-info">
                            {movieDetails?.Poster && movieDetails.Poster !== 'N/A' && (
                                <img src={movieDetails.Poster} alt={movie.title} className="modal-poster" />
                            )}
                            <div className="movie-meta">
                                <h2 className="modal-title">🎬 {movieDetails?.Title || movie.title}</h2>
                                {movieDetails && (
                                    <>
                                        <p className="movie-year">{movieDetails.Year} • {movieDetails.Runtime} • {movieDetails.Rated}</p>
                                        <p className="movie-rating">⭐ {movieDetails.imdbRating}/10</p>
                                        <p className="movie-plot">{movieDetails.Plot}</p>
                                        <p className="movie-genre">{movieDetails.Genre}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {movie.imdbId && (
                            <a
                                href={`https://www.imdb.com/title/${movie.imdbId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="imdb-link"
                            >
                                🔗 View on IMDB
                            </a>
                        )}

                        <p className="modal-subtitle">When are you free to watch?</p>

                        <div className="date-time-picker">
                            <label>
                                Date:
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </label>
                            <label>
                                Time:
                                <input
                                    type="time"
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="modal-buttons">
                            <button
                                className="schedule-btn"
                                onClick={generateCalendarLink}
                                disabled={!selectedDate || !selectedTime}
                            >
                                📅 Send Calendar Invite
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="modal-title">✅ It's a Date!</h2>
                        <p>Calendar invite created for "{movie.title}"</p>
                        <p className="small-text">Check your Google Calendar!</p>
                        <button className="close-btn" onClick={handleClose}>Close</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default MovieModal;
