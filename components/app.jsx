'use strict'

import { Button, Toolbar } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
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
      firebase.initializeApp(firebaseConfig);
    }

    componentDidMount() {
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
          (user) => {
            console.log("signed in: ", !!user);
            this.setState({isSignedIn: !!user})
          }
      );
      
    }

    componentWillUnmount() {
      this.unregisterAuthObserver();
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
        <MuiThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <Route exact path="/" component={Landing}>
            {this.state.isSignedIn && <Redirect to="/dashboard"/>}
          </Route>
          <Route path="/dashboard"  render={(props) => <Dashboard {...props} isSignedIn={this.state.isSignedIn}/>}>
            {!this.state.isSignedIn && <Redirect to="/"/>}
          </Route>
          <AppBar position="absolute" >
            <Toolbar className='appBar'>
              <Typography variant="h6" className='appBarText'>
                Plura
              </Typography>
              {!this.state.isSignedIn && <Button color="inherit">Login</Button>}
              {this.state.isSignedIn && <Button color="inherit" onClick={this.signOut}>Sign Out</Button>}
            </Toolbar>
          </AppBar>
        </SnackbarProvider>
        </MuiThemeProvider>
      </Router>)
  }

  signOut = async event => {
    try {
      await firebase.auth().signOut()
      
    } catch (e) {
      console.log(e);
    }
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));