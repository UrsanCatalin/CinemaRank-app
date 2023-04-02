import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import YouTube from 'react-youtube';
import axios from "axios";

const MovieBox = ({ title, release_date, overview, poster_path, vote_average, movieId }) => {
  const [videos, setVideos] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () =>{
    setShowModal(true);
   
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=6e5b75ee6de4875130c13abb02541c55&language=en-US`
        )
        .then((response) => {
          setVideos(`${response.data.results[0].key}`);
        })
        .catch((error) => {
          console.log(error);
        });
  }
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  const opts = {
    height: '360',
    width: '400',
    playerVars: {
      autoplay: 0,
    },
  };
 
  return (
    <div className="card text-center bg-secondary mb-3" id={movieId}>
      <div className="card-body">
        <img className="card-img-top" src={API_IMG + poster_path} alt="" />
      </div>
      <div className="card-body">
        <button type="button" className="btn btn-dark" onClick={handleShowModal}>View more</button>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
          <img className="card-img-top" src={API_IMG+poster_path} alt="" />
          <h3>{title}</h3>
          <h4>IMDb Vote: {vote_average}</h4>
          <h5>Release date: {release_date}</h5>
          <br></br>
          <h6>Overview</h6>
          <p>{overview}</p>
          {movieId && videos &&
  <div className="video-responsive">
    <YouTube videoId={videos} opts={opts}/>
  </div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovieBox;