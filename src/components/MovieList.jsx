import React from "react";
import MovieBox from "./MovieBox";



function MovieList(props) {
  return (
    <div className="container">
      <div className="grid">
        {props.movies.map((movie) => (
          <MovieBox
            key={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
            release_date={movie.release_date}
            overview={movie.overview}
            video={movie.video}
            movieId={movie.id}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;