import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      hasError: false
    };
  }
  
  /*
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error);
    console.log(info);
  }
  */
 
  getResult(event) {
    event.preventDefault();
    const options = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({'number': this.refs.input.value})
    };

    const request = new Request('http://localhost:8000/fizzbuzz/api', options);
    fetch(request)
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result
        })
      }).catch(function(error) {
        if (typeof response == 'undefined'){
          console.log('Sever is not responding, maybe down');
        } else
          console.log(response, error);
    });
  }

  render() {
    const { result, hasError } = this.state;
    return (
      <div>
        <form onSubmit={this.getResult.bind(this)}>
          <input type="text" ref="input" placeholder="Please give a number..." />
          <button type="submit">Go</button>
        </form> 
        { result && <div>Server says: {result}</div> }
        { this.state.hasError && <div>Something went wrong.</div> }
      </div>
    );
    
  }

}

export default App;
