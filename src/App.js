import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MovieResults from './MovieResults';
import Movie from './Movie';
import logo from './logo.svg';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/movie' component={Movie} />
          <Route path='/' component={MovieResults} />
        </Switch>
      </div>
    )
  }
}

export default App;
