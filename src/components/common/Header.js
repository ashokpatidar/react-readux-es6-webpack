import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';


const Header = ({loading}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active" className="btn btn-primary">Home</IndexLink>
      {" | "}
      <Link to="/about" activeClassName="active" className="btn btn-primary">About</Link>
      {" | "}
      <Link to="/courses" activeClassName="active" className="btn btn-primary">Course</Link>
      {loading && <LoadingDots interval={100} dots={10}/>}
    </nav>
  );
};

Header.propTypes = {
  loading:PropTypes.bool.isRequired
};

export default Header;
