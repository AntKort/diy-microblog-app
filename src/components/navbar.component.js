import React, { Component } from 'react';
import { Link } from 'react-router-dom'; //allows the linkage to different component routes

//class navbar is used for rendering a navigation bar by the help of bootstrap
//components are linked to navigation bar components via the route url
export default class Navbar extends Component { 

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">MicroBlog DIY</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/createuser" className="nav-link">Create New User</Link>
          </li>
          <li className="navbar-item">
          <Link to="/posts" className="nav-link">Post</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}