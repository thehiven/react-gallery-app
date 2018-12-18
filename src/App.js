import React, { Component } from 'react';
import config from './config';
import axios from 'axios';

import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      photos: []
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
      
  }

  handleSearch(query) {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config.apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState(
          {photos: response.data.photos.photo}
        );
      })
      .catch(error => {
        console.log('Caugth an error while requesting photos!')
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <SearchForm handleSearch={this.handleSearch} />
        <Nav />
        <PhotoContainer data={this.state.photos} />
      </div>
    );
  }
}

export default App;
