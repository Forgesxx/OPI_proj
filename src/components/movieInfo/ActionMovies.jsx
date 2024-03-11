import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import config from './config.js';
import MovieCarousel from '../movieCarousel/movieCarousel.jsx';

const ActionMovies = () => {
    const [actionMovies, setActionMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchActionMovies = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${config.apiKey}&with_genres=28&page=${currentPage}`
                );
                setActionMovies((prevMovies) => [...prevMovies, ...response.data.results]);
            } catch (error) {
                console.error('Error fetching action movies:', error);
            }
        };

        fetchActionMovies();
    }, [currentPage]);

    const handleScroll = () => {
        const container = containerRef.current;
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={containerRef}>
            <h2>Бойовики:</h2>
            <MovieCarousel movies={actionMovies} />
        </div>
    );
};

export default ActionMovies;