import React from 'react';
import Image from '../images/404.png';

// Renders 404 image and error for invalid routes
const InvalidRoute = () => {
  return (
    <div className="not-found">
      <img src={Image} alt="Error" />
      <h1>Ooops... 404 means that I couldn't find my way...</h1>
    </div>
  );
};

// Renders error message to tell user there are no matches
const NoMatches = () => {
  return (
    <div className="not-found">
      <h1>Ooops... No matches are found by the search...</h1>
    </div>
  );
};

const NotFound = (props) => {
  return props.nothingFound ? <NoMatches /> : <InvalidRoute />;
};

export default NotFound;