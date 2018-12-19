import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import config from './config';
import axios from 'axios';

import Header from './components/Header';
import SearchForm from './components/SearchForm';
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
    this.startLoading = this.startLoading.bind(this);
  }

  /**
   * Fetches 24 photos from flickr API by using provided query.
   * @param {string} query Query string used as tag to match and fetch photos.
   */
  handleSearch(query) {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config.apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState(
          {
            isLoading: false,
            nothingFound: false,
            photos: response.data.photos.photo
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

  /**
   * Calls 'handleSearch' function on App component and sets that component state to indicate loading of photos.
   * @param {string} query Query string used as tag to match and fetch photos.
   */
  startLoading(query) {
    this.handleSearch(query);
    this.setState({isLoading: true});
  }

  /**
   * Sets necessary props on 'PhotoContainer' and returns it.
   * @param {object} props Props object passed from Router. 
   */
  getPhotoContainer(props) {
    return <PhotoContainer {...props} 
      isLoading={this.state.isLoading} 
      nothingFound={this.state.nothingFound} 
      data={this.state.photos} 
      startLoading={this.startLoading}
    />;
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" render={() => <Redirect to="/search/cats" /> }/>
          {/* Render 'Header' component on all routes with results and pass 'props' object from Router to it. */}
          <Route exact path="/search/:query" render={props => <Header {...props} startLoading={this.startLoading} /> } />
          
          <Switch>
            <Route exact path="/search" render={props => <SearchForm history={props.history} startLoading={this.startLoading} />} />
            <Route exact path="/search/:query" render={props => this.getPhotoContainer(props)} />
            <Route component={NotFound} />
          </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
