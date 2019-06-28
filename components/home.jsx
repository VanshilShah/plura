import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import CreateTask from './create_task';
import TaskCard from './task_card';

export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "loading",
        tasks: undefined,
        createActive: false,
      }
      this.createTaskRef = React.createRef();
    }
    componentDidMount() {
      this.getName();
      this.getTasks();
    }

    getName = async () => {
      try {
        const res = await fetch('/api/name');
        const json = await res.json();
        console.log(json)
        this.setState({name: json.name});
      } catch (err){
        console.log(err);
      }
    }

    getTasks = async () => {
      try {
        const res = await fetch('/api/tasks');
        const json = await res.json();
        console.log(json.tasks)
        this.setState({tasks: json.tasks});
      } catch (err){
        console.log(err);
      }
    }

    createTheme() {
        var primaryColor = '#ffcb05', secondaryColor = '#00b5cc';
        return createMuiTheme({
          palette: {
            primary: {
              light: primaryColor,
              main: primaryColor,
              dark: primaryColor,
              contrastText: '#fff',
            },
            secondary: {
              light: secondaryColor,
              main: secondaryColor,
              dark: secondaryColor,
              contrastText: '#fff',
            }
          },
          typography: {
            useNextVariants: true
          }
        });
    }
    
    render() {
        const theme = this.createTheme();
        const createTask = this.createTaskRef.current
        
        return (
            <MuiThemeProvider theme={theme}>
            <AppBar position="absolute" className='appBar'>
              <Typography component="h1" variant="h6" className='none' noWrap>
                Plura
              </Typography>
            </AppBar>
            <div className='content'>
                {this.state.tasks != undefined && Object.keys(this.state.tasks).map(this.renderTask)}
                {!this.state.createActive 
                  && <Fab 
                    color="primary" 
                    aria-label="Add" 
                    className='createFab'
                    onClick={event => {
                      this.setState({createActive: true})
                      createTask.setState(createTask.startingState());
                }}>
                  <AddIcon />
                </Fab>}
            </div>
            <CreateTask
              ref={this.createTaskRef}
              active={this.state.createActive}
              disactivate={() => this.setState({createActive: false})}></CreateTask>
            </MuiThemeProvider>
        );
    }    
    
    renderTask = key => {
      return key!= 'root' && (<TaskCard key={key} task={this.state.tasks[key]}/>)
    }
  }