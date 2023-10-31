import React from 'react'
import { Link } from "react-router-dom";
import "../styles/header.css"

export default function Header() {
  return (
    <>
      <nav>
        <div className="nav-links">
          <div className="logo">Yash Gavali</div>
          <div className="lins">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/budget">Budget</Link>
          </div>
        </div>
      </nav>
    </>
  )
}
