import React, { useRef, useState } from 'react';
import './movieCarousel.css';
import PlaceHolder from '../img/123.png'

const MovieCarousel = ({ movies }) => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="movie-carousel-container"
      ref={carouselRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="movie-carousel">
        {movies.map((movie, index) => (
          <div key={`${movie.id}_${index}`} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <p>{movie.title}</p>
          </div>
        ))}
        <div className="movie-card">
          <img
            src={PlaceHolder}
            alt="Надпись на карточке"
            className="movie-poster"
            style={{ width: '200px', height: '300px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;