import { Button, Card, Checkbox } from '@material-ui/core';
import moment from 'moment';
import React from 'react';

export default class TaskCard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ...this.props.task
      }
      
    }

    render() {
        return (<Card className='taskCard'>
            <div className='taskCardHeader'>
                <p className='none f-left'>{this.state.Name}</p>
                <p className='none f-left'>{moment(this.state.Deadline).format("ddd, MMM Do, hA")}</p>
                <p className='none f-left'>{moment.duration(this.state.Duration, 'm').humanize()}</p>
                <div className='clear'></div>
            </div>
            <div className='taskCardContent'>
                <div className='dividerRight'>
                <p className='none margin-v-m'>{this.state.Description}</p>
                </div>
                <div>{this.state.Parent ? this.state.Parent.ID : ''}</div>
                <div className='childTaskContainer'>
                  {this.state.Children != undefined && this.state.Children.map(this.renderChildTask)}
                </div>
            </div>
            <Checkbox
                className='completedCheckbox'
                checked={this.state.Completed}
                onChange={event => {this.setState({'Completed': !this.state.Completed})}}
                value="completed"
                inputProps={{'aria-label': 'completed checkbox'}}/>
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