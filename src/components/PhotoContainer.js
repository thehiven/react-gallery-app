import React from 'react';
import Photo from './Photo';
import Loading from './Loading';
import NotFound from './NotFound';

const Results = ({isLoading, data}) => {
  return (
    <div className="photo-container">
      <h2>Results</h2>
      {isLoading ? <Loading /> : <ul>{data}</ul>}
    </div>
  );
}

const PhotoContainer = (props) => {
  let photos;
  if (!props.nothingFound) {
    if (!props.isLoading && props.data.length <= 0) {
      props.handleSearch(props.match.params.query);
    } else {
      photos = props.data.map(photo => <Photo 
        key={photo.id} 
        farm={photo.farm} 
        server={photo.server} 
        id={photo.id} 
        secret={photo.secret}
      /> );
    }
  }

  return props.nothingFound ? <NotFound /> : <Results isLoading={props.isLoading} data={photos} /> ;
};

export default PhotoContainer;