'use strict'

import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './dashboard';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {
      return (
        <SnackbarProvider maxSnack={3}>
          <Dashboard/>
        </SnackbarProvider>)
    }    
  }

ReactDOM.render(<App/>, document.getElementById('app'));