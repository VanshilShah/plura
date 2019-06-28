import MomentUtils from '@date-io/moment';
import { MenuItem, Paper, TextField } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import React from 'react';


export default class CreateTask extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {
        Recurrance: 'once',
        Deadline: moment(),
        Duration: 1,
        ChunkSize: 1,
      } 
    }

    handleDateChange = date => {
      this.setState({deadline: date})
    }

    handleChange = name => event => {
      this.setState({[name]: name=='Deadline'?event:event.target.value})
    };
  

    render() {
      const classes = 'createTask' + (this.props.active? ' createTaskActive':'');
      const showDatePicker = this.state.Recurrance == 'once' || this.state.Recurrance == 'yearly';

      const datePickerProps = {
        'once': {label: "Deadline", disablePast: true, }
      }
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
            id="recurrance"
            select
            label="Recurrance"
            value={this.state.Recurrance}
            onChange={this.handleChange('Recurrance')}
            helperText="How often should this task occur">
            {['once','weekly', 'monthly', 'yearly'].map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          {showDatePicker  
            && <DatePicker
              id="deadline"
              label="Deadline"
              allowKeyboardControl
              autoOk
              value={this.state.Deadline}
              onChange={this.handleChange('Deadline')}
              KeyboardButtonProps={{'aria-label': 'change date',}}
              />}
          <TextField
            id="duration"
            label="Duration (hours)"
            value={this.state.Duration}
            onChange={this.handleChange('Duration')}
            type="number"
          />
          <TextField
            id="chunkSize"
            label="Chunk Size (hours)"
            value={this.state.ChunkSize}
            helperText="How long each chunk should be scheduled"
            onChange={this.handleChange('ChunkSize')}
            type="number"
          />
          <TextField
            id="description"
            multiline
            rows="4"
            value={this.state.Description}
            onChange={this.handleChange('Description')}
            label="Description"/>
          <TextField
            id="name"
            label="Name"/>
        </div>
      </Paper></MuiPickersUtilsProvider>);
            
    }
  }