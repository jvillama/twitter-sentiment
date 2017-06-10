import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TwitterSentiment from './TwitterSentiment';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Twitter Sentiment Analysis</h2>
        </div>
        <TwitterSentiment />
      </div>
    );
  }
}

export default App;
