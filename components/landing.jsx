import { Button, Typography } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import React from 'react';

class Landing extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      
    }
    
    render() {
        return (
            <div className='landingContent'>
                <div className='landingWelcome'>
                <Typography variant="h1" component="h2" gutterBottom>
                    Welcome to Plura
                </Typography>
                <div className='landingButtonContainer'>
                    <Button color='primary' variant="contained">
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