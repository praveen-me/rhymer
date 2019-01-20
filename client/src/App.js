import React, { Component } from 'react';
import HomePage from './components/HomePage';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <HomePage />
        <div className="overlay"></div>
      </div>
    );
  }
}

export default App;
