import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=6e5b75ee6de4875130c13abb02541c55&language=en-US`
      )
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=6e5b75ee6de4875130c13abb02541c55&language=en-US`
      )
      .then((response) => {
        setVideos(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      {movie && (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          {videos.length > 0 && (
            <div>
              <h2>Videos</h2>
              {videos.map((video) => (
                <div key={video.id}>
                  <iframe
                    title={video.name}
                    src={`https://www.youtube.com/embed/${video.key}`}
                  ></iframe>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieDetails;