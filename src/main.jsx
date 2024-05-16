import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createContext } from "react";

export const server = "https://movie-server-beta.vercel.app";
// export const server = "http://localhost:4000";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [watched, setWatched] = useState([]);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        watchlist,
        setWatchlist,
        watched,
        setWatched,
        refresh,
        setRefresh
      }}
    >
      <App />
    </Context.Provider>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <AppWrapper />
);
