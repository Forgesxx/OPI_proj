import React from 'react';
import PopularMovies from './PopularMovies';
import ActionMovies from './ActionMovies';
import ComedyMovies from './ComedyMovies';
import DramaMovies from './DramaMovies';

const AllMovies = () => {
  return (
    <div>
      <PopularMovies/>
      <ActionMovies />
      <ComedyMovies />
      <DramaMovies />
    </div>
  );
};

export default AllMovies;