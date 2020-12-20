import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"; //is used for easier routing 
import "bootstrap/dist/css/bootstrap.min.css"; //bootsrap is used for creating stylish and functional user interface


//importing the react component files
import Navbar from "./components/navbar.component";
import CreatePosts from "./components/posting-page.component";
import CreateUser from "./components/create-user.component";
import Forum from "./components/forum.component";

//Rendering this in index.js
//creating route elements for each component
function App() {
  return (
    <Router>
      <div className="container"> 
        <Navbar />
        <br/>
        <Route path="/" exact component={Forum} />
        <Route path="/createuser" exact component={CreateUser} />
        <Route path="/posts" exact component={CreatePosts} />
      </div>
    </Router>
  );
}


export default App;