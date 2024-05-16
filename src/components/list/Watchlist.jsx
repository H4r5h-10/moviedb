import React, { useContext, useEffect, useState } from "react";
import "./watchlist.css";
import { MovieCard } from "../moviecard/MovieCard.jsx";
import { ToastContainer } from "react-toastify";
import { RiSearchEyeLine } from "react-icons/ri";
import { server, Context } from "../../main.jsx";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";
import { Navigate } from "react-router";
import { Cookies } from "react-cookie";

export const Watchlist = () => {
  const [progress, setProgress] = useState(0);
  // const [list , setList] = useState();
  console.log(progress);
  const { isAuthenticated, refresh, setRefresh, setWatchlist, watchlist } =
    useContext(Context);
  const token = Cookies.load("token");
  useEffect(() => {
    axios
      .get(`${server}/movies/watchlist`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        withCredentials: true,
      })
      .then((res) => {
        setWatchlist(res.data.data);
        setRefresh(false);
      });
  }, [refresh, setRefresh, setWatchlist]);

  if (!isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="top-container">
      <LoadingBar progress={100} onLoaderFinished={() => setProgress(0)} />
      <h1 className="page-head">
        <div className="v-line"></div>My Watchlist
      </h1>
      <div className="card-container">
        {watchlist.length ? (
          <div className="cards">
            {watchlist.map((movie) => (
              <MovieCard
                key={movie.movie.id}
                movie={movie.movie}
                type="watchlist"
              />
            ))}
          </div>
        ) : (
          <h2 className="no">
            Add movies by clicking <RiSearchEyeLine />
          </h2>
        )}
      </div>
      <ToastContainer className={"toasty"} closeButton="false" />
    </div>
  );
};

export default Watchlist;
