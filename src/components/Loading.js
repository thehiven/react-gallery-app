import React from 'react';
import Indicator from '../images/loading.svg';

const Loading = () => {
  return (
    <div className="loading">
      <img src={Indicator} alt="Loading Indicator"></img>
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;