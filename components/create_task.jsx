import { Paper } from '@material-ui/core';
import React from 'react';

export default class CreateTask extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        active: this.props.active
      }
    }

    toggleActive = () => {
      this.setState({active: !this.state.active});
    }

    render() {
        const classes = 'createTask' + (this.state.active? ' createTaskActive':'');
        return (<Paper className={classes}>
        </Paper>);
            
    }
  }