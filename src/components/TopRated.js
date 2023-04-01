import React, { useState, useEffect } from "react";
import MovieBox from "../components/MovieBox";


const API_URL =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=6e5b75ee6de4875130c13abb02541c55&page=1";

function TopRated() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  return (
    <div className="container">
      <div className="grid">
        {movies.map((movie) => (
          <MovieBox
            key={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
            release_date={movie.release_date}
            overview={movie.overview}
            video={movie.video}
          />
        ))}
      </div>
    </div>
  );
}

export default TopRated;