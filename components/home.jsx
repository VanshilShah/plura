import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { yellow, blue } from "@material-ui/core/colors";
import Typography from '@material-ui/core/Typography';

export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "loading",
        tasks: ["no tasks"]
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
        var primaryColor = yellow, secondaryColor = blue;
        return createMuiTheme({
          palette: {
            primary: {
              light: primaryColor[300],
              main: primaryColor[500],
              dark: primaryColor[700],
            },
            secondary: {
              light: secondaryColor[300],
              main: secondaryColor[500],
              dark: secondaryColor[700],
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
            <MuiThemeProvider theme={theme} className='fill'>
            <AppBar position="absolute" className='appBar'>
              <Typography component="h1" variant="h6" className='none' noWrap>
                Plura
              </Typography>
            </AppBar>
            <div className='content'>
                <p>{this.state.name}</p>
                {this.state.tasks.length > 0 && this.state.tasks.map(this.renderTask)}
            </div>
            </MuiThemeProvider>
        );
            
    }    
    
    renderTask = task => {
      return (<p key={task.ID}>{task.Name}</p>)
    }
  }