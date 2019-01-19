import React, { Component } from 'react';
import {connect} from 'react-redux';

import rhymeAction from '../store/actions/rhymeAction';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      isLoading: false
    }
  }

  handleChange = e => {
    this.setState({
      word: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(rhymeAction.getRhymingWords(this.state.word));
  }
  
  render() {
    const {word, isLoading} = this.state;
    
    return (
      <main className="wrapper">
        <form onSubmit={this.handleSubmit} className="form">
          <input type="text" 
          onChange={this.handleChange} 
          className="input-field" 
          placeholder="Enter your word"
          value={word}/>
          <button type="submit" className="btn">Get Details</button>
        </form>
        {
          
        }
        <div className="overlay"></div>
      </main>
    );
  }
}

export default connect()(HomePage);
