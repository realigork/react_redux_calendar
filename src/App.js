import React, { Component } from 'react';

import Calendar from './components/calendar';

import classes from './App.css';

class App extends Component {
  render() {
    return (
      <div className={classes.wrapper}>
        <Calendar />
      </div>
    );
  }
}

export default App;
