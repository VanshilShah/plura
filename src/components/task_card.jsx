import { Button, Card, IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import moment from 'moment';
import React from 'react';

export default class TaskCard extends React.Component {
    constructor(props) {
      super(props);  
    }

    render() {
        const {Name, Deadline, Duration, ID, Description, Parent, Children, Completed} = this.props.task;
        return (<Card className='taskCard'>
            <div className='taskCardHeader'>
                <p className='none f-left'>{Name}</p>
                <p className='none f-left'>{moment.duration(Duration, 'm').humanize()}</p>
                <IconButton 
                  color='inherit'
                  className='none f-right'
                  aria-label='Edit'
                  onClick={this.props.editTask(ID)}>
                  <Edit />
                </IconButton>
                <div className='clear'></div>
            </div>
            <div className='taskCardContent'>
                {moment(Deadline).format("ddd, MMM Do, hA")}
                <div className='dividerRight'>
                <p className='none margin-v-m'>{Description}</p>
                </div>
                <div>{Parent ? Parent.ID : ''}</div>
                <div className='childTaskContainer'>
                  {Children != undefined && Children.map(this.renderChildTask)}
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