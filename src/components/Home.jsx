import { useState, useEffect } from "react";
import "../App.css";
import MovieBox from "./MovieBox";
import CustomNavbar from "./CustomNavbar";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filterMovie, setFilterMovie] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(20);

  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=6e5b75ee6de4875130c13abb02541c55&page=${currentPage}`;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, [API_URL]);

  useEffect(() => {
    setFilterMovie(
      movies.filter((e) => {
        const movieValues = Object.values(e).join("").toLowerCase();
        return movieValues.includes(search.toLowerCase());
      })
    );
  }, [movies, search]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filterMovie.length > 0 ? filterMovie : movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={currentPage === i ? "active" : ""}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }
    return (
      <div className="pagination-container">
        <div className="prev-button-container">
          {currentPage > 1 && (
            <button className="prev-button" onClick={() => handlePageChange(currentPage - 1)}>
              Prev
            </button>
          )}
        </div>
        <ul className="pagination">
          {pageNumbers}
        </ul>
        <div className="next-button-container">
          {currentPage < totalPages && (
            <button className="next-button" onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <CustomNavbar />
      <div className="container">
        <div className="search-container">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movies"
          />
        </div>
        <div className="grid">
          {currentMovies.map((movie) => (
            <MovieBox
              key={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
              release_date={movie.release_date}
              overview={movie.overview}
              movieId={movie.id}
            />
          ))}
        </div>
        {renderPageNumbers()}
      </div>
    </>
  );
};

export default Home;