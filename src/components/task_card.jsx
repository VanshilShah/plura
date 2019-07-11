import { Button, Card, IconButton } from '@material-ui/core';
import { Add, Edit, SubdirectoryArrowRight } from '@material-ui/icons';
import moment from 'moment';
import React from 'react';

export default class TaskCard extends React.Component {
    constructor(props) {
      super(props);  
    }

    render() {
        const {Name, Recurrance, Duration, ID, Description, Parent, Children, Completed} = this.props.task;
        const isChild = Parent.ID != 'root';
        return (<Card className='taskCard'>
            <div className='taskCardHeader'>
                <p className='none f-left'>{Name}</p>
                <IconButton 
                  color='inherit'
                  className='none f-right'
                  aria-label='Edit'
                  onClick={this.props.editTask(ID)}>
                  <Edit />
                </IconButton>
            </div>
            <div className='clear'></div>
            <div className='taskCardContent'>
                <Button 
                  color='secondary'
                  className='taskCardParentButton'
                  variant='outlined'
                  disabled={!isChild}
                  aria-label='Go to parent'
                  onClick={() => this.props.setActive(Parent.ID)}>
                  <SubdirectoryArrowRight />
                   {isChild ? Parent.Name : 'root'}
                </Button>
                {moment.duration(Duration, 'h').humanize()}
                
                <div className='taskCardDeadline'>
                  {this.humanizeDeadline(this.props.task)}  
                </div>
                
                {(Description && Description.length > 0) 
                  && <div className='taskCardDescription'>
                    <p className='none margin-v-m'>{Description}</p>
                </div>}
                <Button 
                  color='primary'
                  className='taskCardParentButton'
                  variant='contained'
                  aria-label='Create child'
                  onClick={this.props.createChild(ID)}>
                  <Add/>
                    Add child
                </Button>

                <div className='childTaskContainer'>
                  {/* {Children != undefined && Children.map(this.renderChildTask)} */}
                </div>
            </div>
            {/* <Checkbox
                className='completedCheckbox'
                checked={Completed}
                onChange={event => {this.setState({'Completed': !Completed})}}
                value="completed"
                inputProps={{'aria-label': 'completed checkbox'}}/> */}
        </Card>);
            
    }
    
    humanizeDeadline = task => {
      const recurrance = task.Recurrance;

      switch (recurrance.Type) {
        case 'once':
          return moment(recurrance.Deadline).format("ddd, MMM Do");
          case 'weekly':
            return 'Every ' + Object.keys(recurrance.Weekdays).filter(key => recurrance.Weekdays[key]).join(', ');
          case 'monthly':
            return 'Every ' + moment().startOf('year').add((recurrance.MonthDay - 1), 'd').format('Do') + ' of the month';
          case 'yearly':
            return 'Every ' + moment(recurrance.YearDay).format('MMMM Do');
          case 'inherit':
            return this.humanizeDeadline(task.Parent);
        default:
          return '';
      }
    }

    renderChildTask = childTask => {
      return (<Button 
        className='childTask'
        key={childTask.ID}
        variant="contained"
        color="secondary"
        onClick={this.props.editTask(childTask.ID)}>
          {childTask.Name}
        </Button>);
    }
  }