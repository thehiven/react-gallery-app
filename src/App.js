import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import config from './config';
import axios from 'axios';

import Header from './components/Header';
import PhotoContainer from './components/PhotoContainer';
import NotFound from './components/NotFound';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      nothingFound: false,
      photos: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.setLoading = this.startLoading.bind(this);
  }

  handleSearch(query, saveTo = 'photos') {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config.apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState(
          {
            isLoading: false,
            [saveTo]: response.data.photos.photo
          }
        );
      })
      .catch(error => {
        console.log('Caugth an error while requesting photos!')
        console.log(error);
      })
      .then(() => {
        if (this.state.photos.length === 0) {
          this.setState({nothingFound: true});
        }
      });
  }

  startLoading() {
    this.setState({isLoading: true});
  }

  getPhotoContainer(props, property = 'photos') {
    return <PhotoContainer {...props} 
      isLoading={this.state.isLoading} 
      nothingFound={this.state.nothingFound} 
      data={this.state[property]} 
      handleSearch={this.handleSearch} 
    />;
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" render={() => <Redirect to="/cats" />} />
          <Route path="/" render={props => <Header {...props} startLoading={this.startLoading} /> } />
          <Switch>
            <Route exact path="/:query" render={props => this.getPhotoContainer(props)} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
