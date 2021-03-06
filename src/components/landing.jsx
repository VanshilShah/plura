import { Button, Dialog, Typography } from '@material-ui/core';
import firebase from 'firebase';
import { withSnackbar } from 'notistack';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class Landing extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          signInOpen: false
      }
      
    }

    uiConfig = {
        signInFlow: 'popup',
        signInOptions: [{provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID}]
      };

    componentDidMount() {
    }

    openSignUp = event => {
        this.setState({signInOpen: true});
    }
    
    render() {
        return (
            <div className='landingContent'>
                <Dialog open={this.state.signInOpen}  onClose={() => this.setState({signInOpen: false})}>
                    <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
                </Dialog>
                <div className='clouds'/>
                <div className='landingWelcome'>
                <Typography variant="h1" component="h2" gutterBottom>
                    Welcome to Plura
                </Typography>
                <div className='landingButtonContainer'>
                    <Button color='primary' variant="contained" onClick={this.openSignUp}>
                        Sign Up
                    </Button>
                    <Button color='inherit' variant="outlined">
                        Login
                    </Button>
                </div>
                </div>
            </div>
        );
    }    
}

export default withSnackbar(Landing)