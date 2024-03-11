import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import config from './config.js';
import MovieCarousel from '../movieCarousel/movieCarousel.jsx';

const DramaMovies = () => {
    const [dramaMovies, setDramaMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchDramaMovies = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${config.apiKey}&with_genres=18&page=${currentPage}`
                );
                setDramaMovies((prevMovies) => [...prevMovies, ...response.data.results]);
            } catch (error) {
                console.error('Error fetching drama movies:', error);
            }
        };

        fetchDramaMovies();
    }, [currentPage]);

    const handleScroll = () => {
        const container = containerRef.current;
        console.log('scrollLeft:', container.scrollLeft);
        console.log('clientWidth:', container.clientWidth);
        console.log('scrollWidth:', container.scrollWidth);

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
            <h2>Drama Movies:</h2>
            <MovieCarousel movies={dramaMovies} />
        </div>
    );
};

export default DramaMovies;
