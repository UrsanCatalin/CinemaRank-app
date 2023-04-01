import React, { useState } from 'react';

function MovieList() {
  const [movies, ] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  function filterUpcomingMovies(movieList) {
    return movieList.filter(movie => movie.isUpcoming === true);
  }

  function filterTopRatedMovies(movieList) {
    return movieList.filter(movie => movie.isTopRated === true);
  }

  function filterNowPlayingMovies(movieList) {
    return movieList.filter(movie => movie.isNowPlaying === true);
  }

  function handleUpcomingFilter() {
    const upcomingMovies = filterUpcomingMovies(movies);
    setFilteredMovies(upcomingMovies);
  }

  function handleTopRatedFilter() {
    const topRatedMovies = filterTopRatedMovies(movies);
    setFilteredMovies(topRatedMovies);
  }

  function handleNowPlayingFilter() {
    const nowPlayingMovies = filterNowPlayingMovies(movies);
    setFilteredMovies(nowPlayingMovies);
  }

  return (
    <div>
      <button onClick={handleUpcomingFilter}>Upcoming</button>
      <button onClick={handleTopRatedFilter}>Top Rated</button>
      <button onClick={handleNowPlayingFilter}>Now Playing</button>
      <ul>
        {filteredMovies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;