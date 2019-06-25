import { Card, Checkbox } from '@material-ui/core';
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
                <p className='none f-right'>{this.state.Deadline}</p>
                <div className='clear'></div>
            </div>
            <div className='taskCardContent'>
                <div className='dividerRight'>{this.state.Description}</div>
                <div>{this.state.Parent ? this.state.Parent.ID : ''}</div>
                {/* <div className='clear'></div> */}
            </div>
            <Checkbox
                className='completedCheckbox'
                checked={this.state.Completed}
                onChange={event => {this.setState({'Completed': !this.state.Completed})}}
                value="completed"
                inputProps={{'aria-label': 'completed checkbox'}}/>
        </Card>);
            
    }
  }