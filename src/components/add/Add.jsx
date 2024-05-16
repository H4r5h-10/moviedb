import React, { useState } from "react";
import { ResultCard } from "./ResultCard";
import LoadingBar from 'react-top-loading-bar';
import "./add.css";
import { ToastContainer } from "react-toastify";

export const Add = () => {
  const [movies, setMovies] = useState([]);
  const [progress, setProgress] = useState(0);
  console.log(progress);


  const onchange = (e) => {
    e.preventDefault();
    fetch(
      // `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_KEY}&include_adult=false&query=${e.target.value}`)
      `https://api.themoviedb.org/3/search/multi?api_key=12737eb0218b6cca5b2303c9865cbcdb&include_adult=false&query=${e.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setMovies(data.results);
        } else {
          setMovies([]);
        } 
      });
  };

  return (
    <div className="add-page">
      <LoadingBar progress={100} onLoaderFinished={() => setProgress(0)}/>
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search For a Movie..."
              onChange={onchange}
            />
          </div>
          <div className="result-wrapper">
          {movies.length > 0 && (
            <ul className="results">
              {movies.filter((movie) => movie.media_type !== "person").map((movie) => (
                <li key={movie.id}>
                  <ResultCard movie={movie} />
                </li>
              ))}
            </ul>
          )}
          </div>
        </div>
        <ToastContainer />

      </div>
  );
};

export default Add;
