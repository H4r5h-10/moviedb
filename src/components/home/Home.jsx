import { Link } from "react-router-dom";
import { Navigate } from "react-router";
import {useContext } from "react";
import './home.css'
import { Context } from "../../main.jsx";

function HomePage() {
  const {isAuthenticated } = useContext(Context);
  if (isAuthenticated) return <Navigate to={"/watchlist"} />;
  return (
    <div>
      <div className="landing-frame">
        <div className="landing-frame-message">
          <div className="legend-head">Welcome To Moviemeter!</div>

          <div className="legend-body">
          Browse, bookmark, and curate your movie journey with MovieMeter's personalized watchlist.
          </div>
          <br />
          <button className="btn">
            <Link className="links" to="/signup">Sign Up</Link>
          </button>
          <button className="btn">
          <Link className="links" to="/login">Log In</Link>
          </button>
            
        </div>
      </div>
    </div>
  );
}
export default HomePage;
