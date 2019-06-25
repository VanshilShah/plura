import AppBar from '@material-ui/core/AppBar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import TaskCard from './task_card';

export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "loading",
        tasks: undefined
      }
      
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
            },
            secondary: {
              light: secondaryColor,
              main: secondaryColor,
              dark: secondaryColor,
            }
          },
          typography: {
            useNextVariants: true
          }
        });
    }
    
    render() {
        const theme = this.createTheme();
        
        return (
            <MuiThemeProvider theme={theme}>
            <AppBar position="absolute" className='appBar'>
              <Typography component="h1" variant="h6" className='none' noWrap>
                Plura
              </Typography>
            </AppBar>
            <div className='content'>
                {this.state.tasks != undefined && Object.keys(this.state.tasks).map(this.renderTask)}
            </div>
            </MuiThemeProvider>
        );
    }    
    
    renderTask = key => {
      return (<TaskCard key={key} task={this.state.tasks[key]}/>)
    }
  }