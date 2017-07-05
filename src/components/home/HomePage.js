import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component{
  render(){
    return (
      <div className="jumbotron">
        <h2>Administartion Application Home Page</h2>
        <p>React, Redux and es6 webpack</p>
        <Link to="about" className="btn btn-primary">Learn More</Link>
      </div>
    );
  }
}

export default HomePage;
