import { Button, Card } from '@material-ui/core';
import React from 'react';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);  
  }

  render() {
      const tasks = this.props.tasks;
      const shouldRenderChildren = tasks != undefined;
      return (<Card className='taskList'>
          <div className='taskListHeader'>All Tasks</div>
          <div className='taskListContent'>
            {shouldRenderChildren && this.renderChildren(tasks.root)}
          </div>
      </Card>);
          
  }

  renderChildren = task => {
  return (task.Children && task.Children.map(childSummary => {
    const isActiveTask = childSummary.ID == this.props.activeTask;
    const child = this.props.tasks[childSummary.ID];
    const isProject = child.TaskType == 'project';
    return <div key={child.ID} className='taskListItem'>
      <Button 
        {...(isActiveTask ? {variant: 'contained', color: 'secondary'}:{})}
        className='taskListItemButton'
        onClick={event => this.props.setActiveTask(child.ID)}>
        {child.Name}
      </Button>
      {this.renderChildren(child)}
    </div>}))
  }
}