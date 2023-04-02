import React, { useState, useEffect } from "react";
import MovieBox from "../components/MovieBox";
import CustomNavbar from "./CustomNavbar";


const API_URL =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=6e5b75ee6de4875130c13abb02541c55";

function Upcoming() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [filterUpcomingMovies, setFilterUpcomingMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`${API_URL}&page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setUpcomingMovies(data.results);
        setTotalPages(data.total_pages);
      });
  }, [currentPage]);

  useEffect(() => {
    setFilterUpcomingMovies(
      upcomingMovies.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [upcomingMovies, search]);

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
      <ul className="pagination">
        {currentPage > 1 && (
          <li onClick={() => handlePageChange(currentPage - 1)}>
            &#60;
          </li>
        )}
        {pageNumbers}
        {currentPage < totalPages && (
          <li onClick={() => handlePageChange(currentPage + 1)}>
            &#62;
          </li>
        )}
      </ul>
    );
  };

  return (
    <>
      <CustomNavbar />
      <div className="container">
      <div className="search-container">
          <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search movies"/>
        </div>
        <div className="grid">
          {filterUpcomingMovies.length > 0
            ? filterUpcomingMovies.map((movie) => (
                <MovieBox
                  key={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  vote_average={movie.vote_average}
                  release_date={movie.release_date}
                  overview={movie.overview}
                  movieId={movie.id}
                />
              ))
            : upcomingMovies.map((movie) => (
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
        <div className="pagination-container">{renderPageNumbers()}</div>
      </div>
    </>
  );
}

export default Upcoming;