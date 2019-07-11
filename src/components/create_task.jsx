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
        parent = {
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
        Children: [],
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

    handleTextChange = (name, useNumber=false) => event => {
      this.setState({[name]: useNumber ? parseFloat(event.target.value) : event.target.value})
    };
  
    
    render() {
      const {ID, Name, Description, TaskType, Duration, ChunkSize, Recurrance, Parent, Children} = this.state;
      const tasks = this.props.tasks ? this.props.tasks : {};
      const isChild = Parent.ID != 'root';
      const hasChildren = Children.length > 0;
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
            inputProps={{ min: this.calculateMinDuration(), max: this.calculateMaxDuration(Parent), step: 0.25 }}
            onChange={this.handleTextChange('Duration', true)}
            helperText={isChild || hasChildren ? 'Must be atleast ' + moment.duration(this.calculateMinDuration(), 'h').humanize() + ' and no more than ' + moment.duration(this.calculateMaxDuration(Parent), 'h').humanize() : 'Must be greater than chunk size'}
            type="number"
          />
          <TextField
            id="chunkSize"
            label="Chunk Size (hours)"
            value={ChunkSize}
            helperText="How long each chunk should be scheduled"
            onChange={this.handleTextChange('ChunkSize', true)}
            inputProps={{ min: "0", max: Duration, step: "0.25" }}
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
          <TextField
            id="parenttasks"
            select
            label="Parent"
            value={Parent.ID}
            className='createTaskParent'
            onChange={event => this.setState({Parent: tasks[event.target.value]})}>
            {Object.keys(tasks).map(key => {
              if (this.canBeParent(key)){
                return (<MenuItem key={key} value={key}>
                  {tasks[key].Name}
                </MenuItem>)
              }
            })}
          </TextField>
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
          || (Duration <= this.calculateMaxDuration(Parent)
            && (Parent.Recurrance.Type == 'once' || Recurrance.Type == 'inherit'))
        )
        && (Recurrance.Type == 'weekly' ? Object.keys(Recurrance.Weekdays).reduce((a, b) => {
          return a || Recurrance.Weekdays[b]
        }, false): true)
        && (Recurrance.Type == 'monthly' ? Recurrance.MonthDay > 0 && Recurrance.MonthDay <= 31: true)
        && Duration >= ChunkSize;
    }

    calculateMinDuration = () => {
      const {Children, ChunkSize} = this.state;
      if (!Children || Children.length == 0) {
        return ChunkSize;
      }
      const childrenDurationSum = Children.reduce((total, child) => total + child.Duration, 0);
      return childrenDurationSum;
    }

    calculateMaxDuration = (task) => {
      if (task.ID == 'root'){
        return Infinity;
      }
      const otherChildrenDurationSum = task.Children.map(child => {
        return child.ID != this.state.ID ? child.Duration : 0
      }).reduce((total, value) => total + value, 0);
      return task.Duration ? task.Duration - otherChildrenDurationSum : '';
    }

    canBeParent = key => {
      const tasks = this.props.tasks;
      console.log(tasks[key].Name, this.calculateMaxDuration(tasks[key]), this.calculateMinDuration());
      console.log(key != this.state.ID, this.isNotChild(this.state.Children, key))
      return key == 'root'
        || (this.state.Parent && key == this.state.Parent.ID)
        || (this.calculateMaxDuration(tasks[key]) >= this.calculateMinDuration()
                && key != this.state.ID && this.isNotChild(this.state.Children, key));
    }

    isNotChild = (children, key) => {
      const tasks = this.props.tasks;
      return !children || children.reduce((total, child) => total && key != child.ID && this.isNotChild(child.Children, key), true);
    }
  }