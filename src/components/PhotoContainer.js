import React from 'react';
import Photo from './Photo';

const PhotoContainer = (props) => {
  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>
        {props.data.map(photo => {
          return (
            <Photo key={photo.id} farm={photo.farm} server={photo.server} id={photo.id} secret={photo.secret} />
          );
        })}
      </ul>
    </div>
  );
};

export default PhotoContainer;