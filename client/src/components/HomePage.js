import React, { Component } from 'react';
import {connect} from 'react-redux';
import Loader from './Loader';
import rhymeAction from '../store/actions/rhymeAction';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      isLoading: false, 
      suggestions: []
    }
  }

  handleChange = e => {
    this.setState({
      word: e.target.value
    }, () => {
      const {word} = this.state;
      if(!word) {
        this.setState({
          suggestions: []
        })
      } else {
        fetch(`https://api.datamuse.com/sug?s=${this.state.word}`, {
          method: 'GET',
          mode: 'no-cors',
          headers: {
            'Content-Type' : 'application/json'
          }
        })
          // .then(res => console.log(res))
          // // .then(data => {
          // //   console.log(data)
          // //   this.setState({
          // //     suggestions: data
          // //   })
          // // }) 
      }
    }); 
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      isLoading: true
    })

    this.props.dispatch(rhymeAction.getRhymingWords(this.state.word, (isFounded) => {
      this.setState({
        isLoading: false,
        suggestions: [],
        word: ''
      })
    }));
  }
  
  render() {
    const { word, isLoading, suggestions } = this.state;
    const { rhymingWords } = this.props;

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
        {/* {
          suggestions.length > 0 ? (
            <div className="suggestion-container">
              {
                suggestions.map(suggestion => (
                  <p className="suggestion">{suggestion.word}</p>
                ))
              }
            </div>
          ): ''
        } */}
        {
          isLoading ? <Loader /> : (
            rhymingWords.length > 0 ? (
                <div className="rhym-word-container">
                  <h2 className="container-header center">Matched Rhyming Words </h2>
                  {
                    rhymingWords.map((word, i) => (
                      <div className="rhym-word" key={i}>
                        <p>{i+1}. {word.word[0].toUpperCase()}{word.word.slice(1)}</p>
                      </div>
                    ))
                  }
                </div>
              )              
              : <p className="info-msg">No, Rhyming Words Available. Search any word.</p>
          ) 
        }
      </main>
    );
  }
}

function mapStateToProps(state) {
  const {rhymingWords} = state;
  return {rhymingWords};
}

export default connect(mapStateToProps)(HomePage);
