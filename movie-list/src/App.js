import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import MovieList from './components/MovieList';
import LikedList from './components/LikedList';
import BlockedList from './components/BlockedList';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <div className="layout">
              <div className='header'>
                <div className="menu-icon">Our Top Rated Movies List</div>
              </div>
              <Route exact path='/' component={Home} />
              <Route path='/MovieList' component={MovieList} />
              <Route path='/LikedList' component={LikedList} />
              <Route path='/BlockedList' component={BlockedList} />

            </div>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
