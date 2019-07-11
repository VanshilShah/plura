import MomentUtils from '@date-io/moment';
import { Button, Card, Checkbox, FormControlLabel, FormLabel, IconButton, MenuItem, TextField } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import React from 'react';


export default class CreateTask extends React.Component { 
    constructor(props) {
      super(props);
      this.state = this.startingState();
    }

    startingState = (parent=undefined) => {
      let shouldInheritDefault = false;
      if (!parent) {
        parent =  {
          ID: 'root',
          Type: 'once',
          Children: [],
        }
      } else {
        shouldInheritDefault = parent.ID != 'root' && parent.Recurrance.Type != 'once';
      }
      return {
        ID: undefined,
        Name: '',
        Description: '',
        TaskType: 'project',
        Recurrance: {
          Type: shouldInheritDefault ? 'inherit' : 'once',
          Deadline: moment(),
          Weekdays: {
            S: false,
            M: false,
            T: false,
            W: false,
            TH: false,
            F: false,
            SA: false
          },
          MonthDay: 1,
          YearDay: moment()
        },
        Parent: parent,
        Duration: 1,
        ChunkSize: 1,
      } 
    }

    handleDateChange = name => date => {
      const {Recurrance} = this.state;
      if (name === 'once') {
        this.setState({Recurrance: {...Recurrance, Deadline: date}})
      } else {
        this.setState({Recurrance: {...Recurrance, YearDay: date}})
      }
    }

    handleWeekdayChange = (event, bool) => {
      console.log(event.target.value)
      const {Recurrance} = this.state;
      this.setState({Recurrance: {...Recurrance, Weekdays: {...Recurrance.Weekdays, [event.target.value]: event.target.checked}}});
    }

    handleTextChange = (name, useInt=false) => event => {
      this.setState({[name]: useInt ? parseInt(event.target.value) : event.target.value})
    };
  
    
    render() {
      const {Name, Description, TaskType, Duration, ChunkSize, Recurrance, Parent} = this.state;
      const isChild = Parent.ID != 'root';
      const {Weekdays} = Recurrance;
      const {recurranceTypes, showWeekdayPicker, showMonthDayPicker, showDatePicker, weekdays, datePickerProps} = this.getRecurranceProps();
      const classes = 'createTask' + (this.props.active? ' createTaskActive':' createTaskSlideOut');
      const tasktypes = ['project', 'roadblock'];
      return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
      <Card className={classes}>
        <div className='createTaskHeader'>
          <TextField
            id="taskName"
            label="Name"
            value={Name}
            onChange={this.handleTextChange('Name')}/>
          {this.state.ID 
          && <IconButton 
            color='inherit'
            className='none f-right'
            aria-label='Delete'
            onClick={this.props.deleteTask(this.state.ID)}>
            <Delete />
          </IconButton>}
        </div>
        <div className='clear'/>
        <div className='createTaskContent'>
          <TextField
            id="tasktype"
            select
            label="Task Type"
            value={TaskType}
            onChange={event => this.setState({TaskType: event.target.value})}
            helperText="What type of task is this">
            {tasktypes.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="recurrance"
            select
            label="Recurrance"
            value={Recurrance.Type}
            onChange={event => this.setState({Recurrance: {...Recurrance, Type: event.target.value}})}
            helperText="How often should this task occur">
            {recurranceTypes.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          {showWeekdayPicker 
            && <div className='createTaskRecurranceDetails'>
            <FormLabel component="legend">Weekdays</FormLabel>
            {weekdays.map(
              weekday => (
                <FormControlLabel
                key={weekday}
                checked={Weekdays[weekday]}
                label={weekday.toUpperCase()}
                control={<Checkbox color="primary"
                value={weekday}
                onChange={this.handleWeekdayChange}/>}
              />
            ))}</div>}
          {showMonthDayPicker
            && <TextField
            className='createTaskRecurranceDetails'
            id="monthDay"
            label="Day of Month"
            value={Recurrance.MonthDay}
            error={Recurrance.MonthDay > 31 || Recurrance.MonthDay < 1}
            onChange={event => this.setState({Recurrance: {...Recurrance, MonthDay: parseInt(event.target.value)}})}
            inputProps={{ min: "1", max: "31", step: "1" }}
            type="number"
          />}
          {showDatePicker  
            && <DatePicker
              {...datePickerProps}
              className='createTaskRecurranceDetails'
              id="deadline"
              allowKeyboardControl
              autoOk
              onChange={this.handleDateChange(Recurrance.Type)}
              />}
          <TextField
            id="duration"
            label="Duration (hours)"
            value={Duration}
            inputProps={{ min: "0", max: this.calculateMaxDuration(), step: "1" }}
            onChange={this.handleTextChange('Duration', true)}
            helperText={isChild ? 'Must be no more than ' + moment.duration(this.calculateMaxDuration(), 'h').humanize() : 'Must be greater than chunk size'}
            type="number"
          />
          <TextField
            id="chunkSize"
            label="Chunk Size (hours)"
            value={ChunkSize}
            helperText="How long each chunk should be scheduled"
            onChange={this.handleTextChange('ChunkSize', true)}
            inputProps={{ min: "0", max: Duration, step: "1" }}
            type="number"
          />
          <TextField
            id="description"
            multiline
            rows="3"
            className={'createTaskDescription'}
            value={Description}
            onChange={this.handleTextChange('Description')}
            label="Description"/>
          <Button 
            className='createTaskButton cancelButton'
            variant="outlined"
            color="secondary"
            onClick={this.props.disactivate}>
              Cancel
          </Button>
          <Button 
            className='createTaskButton'
            variant="contained"
            color="primary"
            disabled={!this.validateForm()}
            onClick={() => this.props.save({...this.state})}>
              Save
          </Button>
        </div>
      </Card></MuiPickersUtilsProvider>);
    }

    getRecurranceProps = () => {
      const {Recurrance, Parent} = this.state;
      const ret = {
        showWeekdayPicker: false,
        showMonthDayPicker: false,
        showDatePicker: false,
        recurranceTypes: ['once','weekly', 'monthly', 'yearly', 'inherit'],
        weekdays: ['S', 'M', 'T', 'W', 'TH', 'F', 'SA'],
        datePickerProps: {},
      }
      switch (Recurrance.Type){
        case 'once':
          ret.showDatePicker = true;
          ret.datePickerProps = {
            label: "Deadline",
            disablePast: true,
            value: Recurrance.Deadline
          }
          break;
        case 'weekly':
          ret.showWeekdayPicker = true;
          break;
        case 'monthly':
          ret.showMonthDayPicker = true;
          break;
        case 'yearly':
          ret.showDatePicker = true;
          ret.datePickerProps = {
            label: "Day of year",
            minDate: moment().startOf('year'),
            maxDate: moment().endOf('year'),
            value: Recurrance.YearDay
          }
          break;
      }

      if (Parent.ID != 'root') {
        switch (Parent.Recurrance.Type){
          case 'once':
            ret.datePickerProps.maxDate = moment(Parent.Recurrance.Deadline);
            break;
          case 'weekly':
            ret.recurranceTypes = ['inherit'];
            break;
          case 'monthly':
            ret.recurranceTypes = ['inherit'];
            break;
          case 'yearly':
            ret.recurranceTypes = ['inherit'];
          case 'inherit':
              ret.recurranceTypes = ['inherit'];
            break;
        }
      }
      return ret;
    }

    validateForm = () => {
      const {Name, Description, Duration, ChunkSize, Parent, Recurrance} = this.state;
      return(
        Name && Name.length > 0 && Name.length < 50
        && Description.length < 400)
        && (Parent.ID == 'root'
          || (Duration <= this.calculateMaxDuration()
            && (Parent.Recurrance.Type == 'once' || Recurrance.Type == 'inherit'))
        )
        && (Recurrance.Type == 'weekly' ? Object.keys(Recurrance.Weekdays).reduce((a, b) => {
          return a || Recurrance.Weekdays[b]
        }, false): true)
        && (Recurrance.Type == 'monthly' ? Recurrance.MonthDay > 0 && Recurrance.MonthDay <= 31: true)
        && Duration >= ChunkSize;
    }

    calculateMaxDuration = () => {
      const Parent = this.state.Parent;
      const otherChildrenDurationSum = Parent.Children.map(child => {
        return child.ID != this.state.ID ? child.Duration : 0
      }).reduce((a, b) => a + b, 0);
      return Parent.Duration ? Parent.Duration - otherChildrenDurationSum : '';
    }
  }