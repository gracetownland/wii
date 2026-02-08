import React, { useState, useEffect } from 'react';
import './MoviePage.css';
import MovieModal from './components/MovieModal';

const OMDB_API_KEY = 'e1b793dd';

// Movie data with IMDB IDs only
const movies = {
    trending: [
        { id: 1, title: 'La La Land', imdbId: 'tt3783958' },
        { id: 2, title: 'The Notebook', imdbId: 'tt0332280' },
        { id: 3, title: 'About Time', imdbId: 'tt2194499' },
        { id: 4, title: 'Spirited Away', imdbId: 'tt0245429' },
        { id: 5, title: 'Howl\'s Moving Castle', imdbId: 'tt0347149' },
        { id: 6, title: 'My Neighbor Totoro', imdbId: 'tt0096283' },
        { id: 7, title: 'Pride & Prejudice', imdbId: 'tt0414387' },
        { id: 8, title: 'When Harry Met Sally', imdbId: 'tt0098635' },
        { id: 9, title: 'Princess Mononoke', imdbId: 'tt0119698' },
        { id: 10, title: 'Ponyo', imdbId: 'tt0876563' },
    ],
    romance: [
        { id: 11, title: 'Crazy Rich Asians', imdbId: 'tt3104988' },
        { id: 12, title: 'To All the Boys I\'ve Loved Before', imdbId: 'tt3846674' },
        { id: 13, title: 'Set It Up', imdbId: 'tt5304992' },
        { id: 14, title: 'Always Be My Maybe', imdbId: 'tt7374948' },
        { id: 15, title: 'The Proposal', imdbId: 'tt1041829' },
        { id: 16, title: 'Notting Hill', imdbId: 'tt0125439' },
        { id: 17, title: 'Sleepless in Seattle', imdbId: 'tt0108160' },
        { id: 18, title: '10 Things I Hate About You', imdbId: 'tt0147800' },
        { id: 45, title: 'Portrait of a Lady on Fire', imdbId: 'tt8613070' },
        { id: 46, title: '27 Dresses', imdbId: 'tt0988595' },
        { id: 47, title: 'Amélie', imdbId: 'tt0211915' },
    ],
    ghibli: [
        { id: 19, title: 'Kiki\'s Delivery Service', imdbId: 'tt0097814' },
        { id: 20, title: 'The Wind Rises', imdbId: 'tt2013293' },
        { id: 21, title: 'Whisper of the Heart', imdbId: 'tt0113824' },
        { id: 22, title: 'Castle in the Sky', imdbId: 'tt0092067' },
        { id: 23, title: 'Grave of the Fireflies', imdbId: 'tt0095327' },
        { id: 24, title: 'Arrietty', imdbId: 'tt1568921' },
    ],
    comedies: [
        { id: 25, title: 'Superbad', imdbId: 'tt0829482' },
        { id: 26, title: 'The Hangover', imdbId: 'tt1119646' },
        { id: 27, title: 'Bridesmaids', imdbId: 'tt1478338' },
        { id: 28, title: 'Game Night', imdbId: 'tt2704998' },
        { id: 29, title: 'The Grand Budapest Hotel', imdbId: 'tt2278388' },
        { id: 30, title: 'What We Do in the Shadows', imdbId: 'tt3416742' },
        { id: 31, title: '21 Jump Street', imdbId: 'tt1232829' },
        { id: 32, title: 'Knives Out', imdbId: 'tt8946378' },
    ],
    longDistance: [
        { id: 33, title: 'Going the Distance', imdbId: 'tt1322312' },
        { id: 34, title: 'Like Crazy', imdbId: 'tt1758692' },
        { id: 35, title: 'Dear John', imdbId: 'tt0989757' },
        { id: 36, title: 'Leap Year', imdbId: 'tt1216492' },
    ],
    thriller: [
        { id: 37, title: 'Gone Girl', imdbId: 'tt2267998' },
        { id: 38, title: 'Shutter Island', imdbId: 'tt1130884' },
        { id: 39, title: 'Get Out', imdbId: 'tt5052448' },
        { id: 40, title: 'Parasite', imdbId: 'tt6751668' },
        { id: 41, title: 'The Prestige', imdbId: 'tt0482571' },
        { id: 42, title: 'Se7en', imdbId: 'tt0114369' },
        { id: 43, title: 'Zodiac', imdbId: 'tt0443706' },
        { id: 44, title: 'Prisoners', imdbId: 'tt1392214' },
    ],
    indian: [
        { id: 48, title: 'Bombay', imdbId: 'tt0112553' },
        { id: 49, title: 'Ohm Shanti Oshana', imdbId: 'tt3517192' },
        { id: 50, title: 'Vinnaithaandi Varuvaayaa', imdbId: 'tt1609168' },
        //{ id: 51, title: 'Ennu Ninte Moideen', imdbId: 'tt4888834' },
        { id: 52, title: 'Sita Ramam', imdbId: 'tt20850406' },
        { id: 53, title: 'Thiruchitrambalam', imdbId: 'tt11772746' },
    ]
};

// Cache for poster images
const posterCache = {};

const MoviePage = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [posterImages, setPosterImages] = useState({});
    const [modalStyle, setModalStyle] = useState({});
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle header scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedMovie) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedMovie]);

    // Fetch posters for all movies on mount
    useEffect(() => {
        const fetchAllPosters = async () => {
            const allMovies = [
                ...movies.trending,
                ...movies.romance,
                ...movies.ghibli,
                ...movies.comedies,
                ...movies.longDistance,
                ...movies.thriller,
                ...movies.indian
            ];

            for (const movie of allMovies) {
                if (movie.imdbId && !posterCache[movie.imdbId]) {
                    try {
                        const res = await fetch(`https://www.omdbapi.com/?i=${movie.imdbId}&apikey=${OMDB_API_KEY}`);
                        const data = await res.json();
                        if (data.Poster && data.Poster !== 'N/A') {
                            posterCache[movie.imdbId] = data.Poster;
                        }
                    } catch (err) {
                        console.error('Error fetching poster for', movie.title);
                    }
                }
            }
            setPosterImages({ ...posterCache });
        };

        fetchAllPosters();
    }, []);

    const handleMovieClick = async (movie, event) => {
        // Get clicked element position for animation
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        setModalStyle({
            '--origin-x': `${centerX}px`,
            '--origin-y': `${centerY}px`,
        });

        setSelectedMovie(movie);
        setMovieDetails(null);

        if (movie.imdbId) {
            setLoading(true);
            try {
                const res = await fetch(`https://www.omdbapi.com/?i=${movie.imdbId}&apikey=${OMDB_API_KEY}`);
                const data = await res.json();
                setMovieDetails(data);
            } catch (err) {
                console.error('Error fetching movie details:', err);
            }
            setLoading(false);
        }
    };

    const closeModal = () => {
        setSelectedMovie(null);
        setMovieDetails(null);
    };

    const getMoviePoster = (movie) => {
        if (movie.img) return movie.img;
        if (movie.imdbId && posterImages[movie.imdbId]) return posterImages[movie.imdbId];
        return 'https://via.placeholder.com/300x450?text=Loading...';
    };

    const scrollRow = (rowId, direction) => {
        const row = document.getElementById(rowId);
        if (row) {
            const scrollAmount = 600;
            row.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const scrollToSection = (rowId) => {
        const element = document.getElementById(rowId);
        if (element) {
            const headerOffset = 70;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    const renderMovieRow = (movieList, title, rowId) => {
        const needsScroll = movieList.length > 3;
        return (
            <div className="row-container">
                <h2 className="row-title">{title}</h2>
                <div className="row-wrapper">
                    {needsScroll && <button className="scroll-btn scroll-left" onClick={() => scrollRow(rowId, 'left')}>❮</button>}
                    <div className="row-posters" id={rowId}>
                        {movieList.map(movie => (
                            <img
                                key={movie.id}
                                src={getMoviePoster(movie)}
                                alt={movie.title}
                                className="poster poster-large"
                                onClick={(e) => handleMovieClick(movie, e)}
                            />
                        ))}
                    </div>
                    {needsScroll && <button className="scroll-btn scroll-right" onClick={() => scrollRow(rowId, 'right')}>❯</button>}
                </div>
            </div>
        );
    };

    return (
        <div className="movie-page">
            <div className={`movie-header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="logo">LOVEFLIX</div>
                <nav className="header-nav">
                    <span className="nav-item" onClick={() => scrollToSection('row-trending')}>Trending</span>
                    <span className="nav-item" onClick={() => scrollToSection('row-romance')}>Romance</span>
                    <span className="nav-item" onClick={() => scrollToSection('row-indian')}>Indian</span>
                    <span className="nav-item" onClick={() => scrollToSection('row-ghibli')}>Ghibli</span>
                    <span className="nav-item" onClick={() => scrollToSection('row-comedies')}>Comedies</span>
                    <span className="nav-item" onClick={() => scrollToSection('row-thriller')}>Thriller</span>
                </nav>
                <div className="profile-section">
                    <span className="profile-name">Siya</span>
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Siya&backgroundColor=b6e3f4"
                        alt="Siya's profile"
                        className="profile-avatar"
                    />
                </div>
            </div>

            <div className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">Valentine's Day Special</h1>
                    <p className="hero-desc">
                        A curated selection of movies to watch with the YU. 🍿
                    </p>
                </div>
            </div>

            <div className="movie-rows">
                {renderMovieRow(movies.trending, 'Trending Now', 'row-trending')}
                {renderMovieRow(movies.romance, 'Romantic Comedies', 'row-romance')}
                {renderMovieRow(movies.indian, 'Indian Cinema 🇮🇳', 'row-indian')}
                {renderMovieRow(movies.ghibli, 'Studio Ghibli ✨', 'row-ghibli')}
                {renderMovieRow(movies.comedies, 'Comedies 😂', 'row-comedies')}
                {renderMovieRow(movies.longDistance, 'Long Distance Favorites 💕', 'row-longdistance')}
                {renderMovieRow(movies.thriller, 'Thrillers & Mystery 🔪', 'row-thriller')}
            </div>

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    movieDetails={movieDetails}
                    loading={loading}
                    onClose={closeModal}
                    modalStyle={modalStyle}
                />
            )}

            <footer className="love-footer">
                <div className="footer-bottom">
                    <p>Made with ❤️ for my Valentine</p>
                    <p>© 2026 LOVEFLIX - All Rights Reserved for You</p>
                </div>
            </footer>
        </div>
    );
};

export default MoviePage;
