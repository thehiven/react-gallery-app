import React from 'react';

const Photo = ({farm, server, id, secret}) => {
  return (
    <li>
      {/* Build image url from provied props */}
      <img src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`} alt="" />
    </li>
  ); 
};

export default Photo;