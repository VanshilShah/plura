'use strict'

import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {
      return (
        <SnackbarProvider maxSnack={3}>
          <Home/>
        </SnackbarProvider>)
    }    
  }

ReactDOM.render(<App/>, document.getElementById('app'));