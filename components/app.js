'use strict'

import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
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

    render() {
      return (
        <div>
          <p>{this.state.name}</p>
          {this.state.tasks.map(task => this.renderTask(task))}
        </div>);
    }    
    
    renderTask = task => {
      console.log(task)
      return (<p>{task.Name}</p>)
    }
  }

ReactDOM.render(<App/>, document.getElementById('app'));