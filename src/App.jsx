import './App.css';
import { BrowserRouter as Router,  Routes, Route} from 'react-router-dom';
import {Header} from './components/header/Header.jsx'
import Home from './components/home/Home.jsx';
import {Watched} from './components/list/Watched.jsx'
import {Watchlist} from './components/list/Watchlist.jsx'
import {Add} from './components/add/Add.jsx'
import { Context } from './main.jsx';
import SignUp from './components/login/Signup.jsx'
import Login from './components/login/Login.jsx'
import { useContext} from 'react';


function App() {
  const {isAuthenticated } = useContext(Context);
  return (
    <Router>
      {isAuthenticated?<Header/>:""}
      <Routes>
        {isAuthenticated?<Route exact path="/" element={<Watchlist/>}/>:<Route exact path="/" element={<Home/>}/> }
        <Route exact path="/watched" element={<Watched/>}/>
        <Route exact path="/watchlist" element={<Watchlist/>}/>
        <Route exact path="/add" element={<Add/>}/>
        <Route exact path="/signup" element={<SignUp/>}/>
        <Route exact path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
