import { Button, Card } from '@material-ui/core';
import React from 'react';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);  
  }

  render() {
      // const {Name, Deadline, Duration, ID, Description, Parent, Children, Completed} = this.props.task;
      return (<Card className='taskList'>
          <div className='taskListHeader'>All Tasks</div>
          <div className='taskListContent'>
            {this.props.tasks != undefined && this.renderChildren(this.props.tasks.root)}
          </div>
      </Card>);
          
  }

  renderChildren = task => {
  return (task.Children && task.Children.map(childSummary => {
    const child = this.props.tasks[childSummary.ID];
    const isProject = child.TaskType == 'project';
    return <div key={child.ID} className='taskListItem'>
      <Button className='taskListItemButton'>
        {child.Name}
      </Button>
      {this.renderChildren(child)}
    </div>}))
  }
}