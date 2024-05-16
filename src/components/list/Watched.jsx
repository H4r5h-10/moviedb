import React, { useContext, useEffect, useState } from "react";
import { server, Context } from "../../main.jsx";
import { MovieCard } from "../moviecard/MovieCard";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";
import { Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import cookie from "react-cookies";

export const Watched = () => {
  const { isAuthenticated, refresh, setRefresh, watched, setWatched } =
    useContext(Context);

  const [progress, setProgress] = useState(0);
  console.log(progress);
  const token = cookie.load("token");
  useEffect(() => {
    axios
      .get(`${server}/movies/watched`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        withCredentials: true,
      })
      .then((res) => {
        setWatched(res.data.data);
        setRefresh(false);
      });
  }, [refresh, setWatched, setRefresh]);

  if (!isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div>
      <LoadingBar progress={100} onLoaderFinished={() => setProgress(0)} />
      <ToastContainer className={"toasty"} closeButton="false" />
      <div className="top-container">
        <h1 className="page-head">
          <div className="v-line"></div>Watched Movies
        </h1>
        <div className="card-container">
          {watched.length ? (
            <div className="cards">
              {watched.map((movie) => (
                <MovieCard
                  key={movie.movie.id}
                  movie={movie.movie}
                  type="watched"
                  id={movie.id}
                />
              ))}
            </div>
          ) : (
            <h2 className="no">No movies in your Watched List...</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watched;
