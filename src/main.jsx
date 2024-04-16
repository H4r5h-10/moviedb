import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createContext } from "react";

// export const server = "https://movie-server-6n53.onrender.com";
export const server = "http://localhost:4000";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [loading, setLoading] = useState(false);
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
