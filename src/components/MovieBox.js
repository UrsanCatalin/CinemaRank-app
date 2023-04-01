import { useState } from "react";
import {Button, Modal } from "react-bootstrap";

const MovieBox = ({ title, release_date, overview, poster_path, vote_average, videoId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const API_IMG = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="card text-center bg-secondary mb-3">
      <div className="card-body">
      <img className="card-img-top" src={API_IMG+poster_path} alt="" />
      </div>
      <div className="card-body">
        <button type="button" className="btn btn-dark" onClick={handleShowModal}>View more</button>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="video-responsive">
            <iframe
              title="movie trailer"
              src={`https://www.youtube.com/embed/${videoId}`}
              allowFullScreen
            />
          </div>
          <img className="card-img-top" src={API_IMG+poster_path} alt=""/>
          <h3>{title}</h3>
          <h4>IMDb Vote: {vote_average}</h4>
          <h5>Release date: {release_date}</h5>
          <br></br>
          <h6>Overview</h6>
          <p>{overview}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovieBox;