'use strict'

import AppBar from '@material-ui/core/AppBar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from './dashboard';


class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    createTheme() {
      var primaryColor = '#ffcb05', secondaryColor = '#00b5cc';
      return createMuiTheme({
        palette: {
          primary: {
            light: primaryColor,
            main: primaryColor,
            dark: primaryColor,
            contrastText: '#fff',
          },
          secondary: {
            light: secondaryColor,
            main: secondaryColor,
            dark: secondaryColor,
            contrastText: '#fff',
          },
        },
        typography: {
          useNextVariants: true
        }
      });
  }

    render() {
      const theme = this.createTheme();
      return (
        <Router>
        <Route  path="/" component={Dashboard}>
          <MuiThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
              <AppBar position="absolute" className='appBar'>
                <Typography component="h1" variant="h6" className='none' noWrap>
                  Plura
                </Typography>
              </AppBar>
              <Route  path="/dashboard" component={Dashboard}></Route>
          </SnackbarProvider>
          </MuiThemeProvider>
        </Route>
        </Router>)
    }    
  }

ReactDOM.render(<App/>, document.getElementById('app'));