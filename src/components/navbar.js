import React from "react";
import {Link, useNavigate} from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Navbar = ()=>{
  const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate("/login");
  }
  let location = useLocation();
    return(
        <div>
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">digiNote</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarScroll">
      <ul className="navbar-nav me-auto my-2 my-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about"?"active":""}`} aria-current="page" to="/about">About</Link>
        </li>
        
      </ul>
      {!localStorage.getItem("token")?<form className="d-flex">
        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
      </form>:<button onClick={handleLogout} className="btn btn-primary">Logout</button>}
    </div>
  </div>
</nav>
        </div>
    )
}

export default Navbar;