import React from 'react';
import Photo from './Photo';
import Loading from './Loading';
import NotFound from './NotFound';

/**
* Renders either 'loading' component or results depending on provided props.
*/
const Results = ({isLoading, data}) => {
  return (
    <div className="photo-container">
      <h2>Results</h2>
      {isLoading ? <Loading /> : <ul>{data}</ul>}
    </div>
  );
}

/**
 * Renders either 'NotFound' component or 'Results' component
*/
const PhotoContainer = (props) => {
  let photos;
  if (!props.isLoading && props.data.length === 0) {
    // load pictures if no pictures were loaded before rendering this component
    props.startLoading(props.match.params.query);
  } else {
    photos = props.data.map(photo => <Photo 
      key={photo.id} 
      farm={photo.farm} 
      server={photo.server} 
      id={photo.id} 
      secret={photo.secret}
    />);
  }

  return props.nothingFound ? <NotFound nothingFound={props.nothingFound} /> : <Results isLoading={props.isLoading} data={photos} /> ;
};

export default PhotoContainer;