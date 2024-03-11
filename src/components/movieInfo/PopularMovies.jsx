import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import config from './config.js';
import MovieCarousel from '../movieCarousel/movieCarousel.jsx';

const PopularMovies = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${config.apiKey}&language=en-US&page=${currentPage}`
                );
                setPopularMovies((prevMovies) => [...prevMovies, ...response.data.results]);
            } catch (error) {
                console.error('Error fetching popular movies:', error);
            }
        };

        fetchPopularMovies();
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
            <h2>Дивляться зараз:</h2>
            <MovieCarousel movies={popularMovies} />
        </div>
    );
};

export default PopularMovies;