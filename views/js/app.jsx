class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "loading"
      }
      
    }
    componentDidMount() {
      this.getName();
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
    render() {
      return (<p>{this.state.name}</p>);
    }
  }

ReactDOM.render(<App/>, document.getElementById('app'));