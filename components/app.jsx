'use strict'

import { Button, Toolbar } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase/app';
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from './dashboard';
import Landing from './landing';


class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isSignedIn: false
      }
      var firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: "plura-244219.firebaseapp.com",
        databaseURL: "https://plura-244219.firebaseio.com",
        projectId: "plura-244219",
        storageBucket: "plura-244219.appspot.com",
        messagingSenderId: "869235351640",
        appId: "1:869235351640:web:ee85b00817537af5"
      };
      
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }

    componentDidMount() {
      
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
          <Route exact path="/" component={Landing}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <AppBar position="absolute" >
            <Toolbar className='appBar'>
              <Typography variant="h6" className='appBarText'>
                Plura
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </SnackbarProvider>
        </MuiThemeProvider>
      </Route>
      </Router>)
  }    
}

ReactDOM.render(<App/>, document.getElementById('app'));