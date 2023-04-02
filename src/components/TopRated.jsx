import React, { useState, useEffect } from "react";
import MovieBox from "../components/MovieBox";
import CustomNavbar from "./CustomNavbar";

const API_URL = "https://api.themoviedb.org/3/movie/top_rated";
const API_KEY = "6e5b75ee6de4875130c13abb02541c55";


function TopRated() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      let url = `${API_URL}?api_key=${API_KEY}&page=${currentPage}`;
      if (search) {
        url += `&query=${search}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setTopRatedMovies(data.results);
      setTotalPages(data.total_pages);
    };
    fetchTopRatedMovies();
  }, [currentPage, search]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
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
          {topRatedMovies.map((movie) => (
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
        <ul className="pagination">
          {currentPage > 1 && (
            <li className="prev-page" onClick={handlePrevPage}>
              {"<"} Prev
            </li>
          )}
          {currentPage < totalPages && (
            <li className="next-page" onClick={handleNextPage}>
              Next {">"}
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default TopRated;