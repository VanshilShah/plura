import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import firebase from 'firebase/app';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import api from '../controllers/api';
import CreateTask from './create_task';
import TaskCard from './task_card';
import TaskList from './task_list';

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
        activeTaskKey: '',
        deletingTask: ''
      }
      this.createTaskRef = React.createRef();
      this.activeTaskRef = React.createRef();
    }


    componentDidMount() {
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
          (user) => {
            var user = firebase.auth().currentUser;
            if (user != null) {
              this.getName();
              this.getTasks();
            }
          }
      );
      
    }

    componentWillUnmount() {
      this.unregisterAuthObserver();
    }

    getName = async () => {
      try {
        const res = await api.getName();
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
        const res = await api.getTasks();
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
        const res = await api.saveTask(task);
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
        const task = this.state.tasks[this.state.deletingTask];
        const res = await api.deleteTask(task);
        if (res.status == 200){
          this.cancelDeleteTask();
          this.setState({createActive: false, activeTaskKey:''});
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
        const { createActive, tasks, activeTaskKey} = this.state;
        return (
            <div className='content flex'>
                {this.renderDeleteDialog()}
                <TaskList tasks={tasks} activeTask={activeTaskKey} setActiveTask={this.setActiveTask}/>
                {activeTaskKey != '' && <TaskCard ref={this.activeTaskRef} task={tasks[activeTaskKey]} editTask={this.editTask}/>}
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
                active={createActive}
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

    setActiveTask = key => {
      this.setState({activeTaskKey: key});
    }
    
    createTask = task => {
      if(this.state.createActive && this.createTaskRef.current.state){ 
        this.setState({createActive:false})
        return
      }
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