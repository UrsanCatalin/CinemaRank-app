import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import TopRated from "./components/TopRated";
import NowPlaying from "./components/NowPlaying";
import UpComing from "./components/UpComing";
import MovieBox from "./components/MovieBox";
import React, { useEffect } from "react";

const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=6e5b75ee6de4875130c13abb02541c55";
const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=6e5b75ee6de4875130c13abb02541c55&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [filterMovie, setFilterMovie] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  useEffect(() => {
    setFilterMovie(
      movies.filter((e) =>
        e.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [movies, query]);

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("Searching");
    try {
      const url = `${API_SEARCH}${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (e) {
      console.log(e);
      setFilterMovie([]);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Router>
      <Navbar bg="dark" expand="lg" variant="dark" className="navbar-custom">
        <Container fluid>
          <Navbar.Brand href="/">CinemaRank</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">       
              <Nav.Link href="/top-rated">
                <Button variant="primary" className="btn-custom">
                  Top Rated
                </Button>
              </Nav.Link>
              <Nav.Link href="/now-playing">
                <Button variant="primary" className="btn-custom">
                  Now Playing
                </Button>
              </Nav.Link>
              <Nav.Link href="/upcoming">
                <Button variant="primary" className="btn-custom">
                  Upcoming
                </Button>
              </Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchMovie}>
              <FormControl
                type="search"
                placeholder="Movie Search"
                className="me-2"
                aria-label="search"
                name="query"
                value={query}
                onChange={changeHandler}
              ></FormControl>
              <Button variant="secondary" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    

      <div className="container">
        <div className="grid">
          {filterMovie.length > 0
            ? filterMovie.map((movie) => (
                <MovieBox
                  key={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  vote_average={movie.vote_average}
                  release_date={movie.release_date}
                  overview={movie.overview}
                  video={movie.video}
                />
              ))
            : movies.map((movie) => (
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

      <Routes>
        <Route path="/" element={<MovieBox />} />
        <Route path="/Pages/TopRatedPages" element={<TopRated />} />
        <Route path="/now-playing" element={<NowPlaying />} />
        <Route path="/upcoming" element={<UpComing />} />
        <Route path="/search/:query" element={<MovieBox />} />
      </Routes>
    </Router>
    
  );
}

export default App;