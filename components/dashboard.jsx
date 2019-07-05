import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import firebase from 'firebase/app';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import CreateTask from './create_task';
import TaskCard from './task_card';

class Dashboard extends React.Component {
    static contextTypes = {
      router: PropTypes.object
    }

    constructor(props) {
      super(props);
      this.state = {
        name: "loading",
        tasks: undefined,
        createActive: false,
        showDeleteTaskDialog: false,
        deletingTask: ''
      }
      this.createTaskRef = React.createRef();
    }

    componentDidMount() {
      if (this.props.isSignedIn) {
        var user = firebase.auth().currentUser;

        if (user != null) {
          this.getName();
          this.getTasks();
        }
       
      }
    }

    getName = async () => {
      try {
        const idToken = await firebase.auth().currentUser.getIdToken();
        const res = await fetch('/api/name', {
          method: 'GET',
          withCredentials: true,
          credentials: 'include',
          headers: {
            'Authorization': idToken
          }
        });
        const json = await res.json();
        console.log(json)
        this.setState({name: json.name});
      } catch (err){
        this.props.enqueueSnackbar('Could not load user info', {variant: 'warning'});
        console.log(err);
      }
    }

    getTasks = async (user) => {
      try {
        const idToken = await firebase.auth().currentUser.getIdToken();
        const res = await fetch('/api/tasks', {
          method: 'GET',
          withCredentials: true,
          credentials: 'include',
          headers: {
            'Authorization': idToken
          }
        });
        const json = await res.json();
        console.log(json.tasks)
        this.setState({tasks: json.tasks});
      } catch (err){
        this.props.enqueueSnackbar('Could not load tasks', {variant: 'warning'});
        console.log(err);
      }
    }

    saveTask = async(task) => {
      try{
        const idToken = await firebase.auth().currentUser.getIdToken();
        const res = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Authorization': idToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task)
        });
        if (res.status == 200){
          this.setState({createActive: false});
          this.props.enqueueSnackbar('Task Saved', {variant: 'success'});
          this.getTasks()
        }
        console.log(res);
      }catch (err) {
        this.props.enqueueSnackbar('Could not save task', {variant: 'error'});
        console.log(err);
      }
    }

    deleteTask = async() => {
      try{
        const idToken = await firebase.auth().currentUser.getIdToken();
        const task = this.state.tasks[this.state.deletingTask];
        const res = await fetch('/api/tasks', {
          method: 'DELETE',
          headers: {
            'Authorization': idToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task)
        });
        if (res.status == 200){
          this.cancelDeleteTask();
          this.setState({createActive: false});
          this.props.enqueueSnackbar('Task Deleted', {variant: 'success'});
          this.getTasks()
        }
        console.log(res);
      }catch (err) {
        this.props.enqueueSnackbar('Could not delete task', {variant: 'error'});
        console.log(err);
      }
    }
    
    cancelDeleteTask = event => {
      this.setState({showDeleteTaskDialog: false, deletingTask: ''})
    }
    openDeleteTask = key => event => {
      this.setState({showDeleteTaskDialog: true, deletingTask: key})
    }

    
    
    render() {
        const createTaskComponent = this.createTaskRef.current
        return (
            <div className='content'>
                {this.renderDeleteDialog()}
                {this.state.tasks != undefined && Object.keys(this.state.tasks).map(this.renderTask)}
                {!this.state.createActive 
                  && <Fab 
                    color="primary" 
                    aria-label="Add" 
                    className='createFab'
                    onClick={event => {
                      this.createTask(createTaskComponent.startingState())
                }}>
                  <AddIcon />
                </Fab>}
              <CreateTask
                ref={this.createTaskRef}
                active={this.state.createActive}
                disactivate={() => this.setState({createActive: false})}
                deleteTask={this.openDeleteTask}
                save={this.saveTask}/>
            </div>
        );
    }    

    renderDeleteDialog = () => {
      return (
        <Dialog
          open={this.state.showDeleteTaskDialog}
          onClose={this.cancelDeleteTask}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description">
          <DialogTitle id="delete-dialog-title">{"Are you sure you want to delete this task?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Once a task is deleted, it cannot be recovered, all of the subtasks and roadblocks associated with this task will also be deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={this.cancelDeleteTask} color="primary">
            No
          </Button>
          <Button onClick={this.deleteTask} color="primary" variant='contained' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      );
    }

    
    createTask = task => {
      const createTaskComponent = this.createTaskRef.current
      this.setState({createActive: true})
      createTaskComponent.setState({...task});
    }

    editTask = key => event => {
      const task = this.state.tasks[key];
      this.createTask(task);
    }

    renderTask = key => {
    const task = this.state.tasks[key];
    return key!= 'root' && (<TaskCard key={key} task={task} editTask={this.editTask}/>)
    }
  }

  export default withSnackbar(Dashboard)