'use strict'

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './home';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {
      return (<Home/>)
    }    
  }

ReactDOM.render(<App/>, document.getElementById('app'));