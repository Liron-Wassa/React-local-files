import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import React, { Component } from 'react';
import Images from './Images/Images';
import Upload from './Upload/Upload';
import Edit from './Edit/Edit';
// import axios from 'axios';
import './App.css';

class App extends Component {

  render(){

    return (
        <div className = "App">
          <BrowserRouter>
            <div className = "navBar">
              <div>
                <Link to="/images">Images</Link>
                <Link to="/upload">Upload</Link>
              </div>
            </div>
            <Switch>
              <Route exact path = "/images" component = {Images}/>
              <Route exact path = "/upload" component = {Upload}/>
              <Route exact path = "/edit" component = {Edit}/>
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
  
}

export default App;