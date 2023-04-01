import React, { useState, useEffect } from "react";
import MovieBox from "./MovieBox";

const API_KEY = "your_api_key";
const API_URL = `https://api.themoviedb.org/3/movie/`;

const CinemaRank = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("now_playing");

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(`${API_URL}${category}?api_key=${API_KEY}&language=en-US&page=1`);
      const data = await res.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, [category]);

  const handleMenuClick = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">CinemaRank</h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
        <a className={`nav-link ${category === "now_playing" ? "active" : ""}`} onClick={() => handleMenuClick("now_playing")} href="/">

            Now Playing
          </a>
        </li>
        <li className="nav-item">
        <a className={`nav-link ${category === "top_rated" ? "active" : ""}`} onClick={() => handleMenuClick("now_playing")} href="/">

            Top Rated
          </a>
        </li>
        <li className="nav-item">
        <a className={`nav-link ${category === "now_playing" ? "active" : ""}`} onClick={() => handleMenuClick("now_playing")} href="/">

            Upcoming
          </a>
        </li>
      </ul>
      <div className="row">
        {movies.map((movie) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3" key={movie.id}>
            <MovieBox
              title={movie.title}
              release_date={movie.release_date}
              overview={movie.overview}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
              videoId={movie.videoId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemaRank;