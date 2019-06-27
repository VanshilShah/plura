import MomentUtils from '@date-io/moment';
import { Paper, TextField } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import React from 'react';

export default class CreateTask extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        active: this.props.active,
        selectedDate: moment()
      }
    }

    toggleActive = () => {
      this.setState({active: !this.state.active});
    }

    handleDateChange = date => {
      this.setState({selectedDate: date})
    }

    render() {
      const classes = 'createTask' + (this.state.active? ' createTaskActive':'');
      return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
      <Paper className={classes}>
        <div className='createTaskHeader'>
          New task
        </div>
        <div className='createTaskContent'>
          <TextField
            id="taskName"
            label="Name"/>
          <TextField
            id="name"
            label="Name"/>
          <DatePicker
            id="deadline"
            label="Deadline"
            disablePast
            allowKeyboardControl
            value={this.state.selectedDate}
            onChange={this.handleDateChange}
            minDate={new Date()}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <TextField
            id="name"
            label="Name"/>
          <TextField
            id="name"
            label="Name"/>
        </div>
      </Paper></MuiPickersUtilsProvider>);
            
    }
  }