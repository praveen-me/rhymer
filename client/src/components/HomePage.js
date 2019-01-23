import React, { Component } from 'react';
import {connect} from 'react-redux';
import Loader from './Loader';
import rhymeAction from '../store/actions/rhymeAction';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      isLoading: true, 
      suggestions: [],
    }
  }

  componentDidMount() {
    this.props.dispatch(rhymeAction.getTopSearched((isSucceed) => {
      if(isSucceed) {
        this.setState({
          isLoading: false
        });
      }
    }))
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
          headers: {
            'Content-Type' : 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            this.setState({
              suggestions: data
            })
          }) 
      }
    }); 
  }

  makeSearch = (word) => {
    this.setState({
      isLoading: true
    })

    this.props.dispatch(rhymeAction.getRhymingWords(word, (isFounded) => {
      this.setState({
        isLoading: false,
        suggestions: [],
        word: ''
      })
    })); 
  }

  handleSubmit = e => {
    e.preventDefault();
    this.makeSearch(this.state.word);
    this.props.dispatch(rhymeAction.addSearchedToDB(this.state.word))
  }

  handleSearch = e => {
    this.makeSearch(e.target.innerText);
  }
  
  render() {
    const { word, isLoading, suggestions } = this.state;
    const { rhymingWords, topSearched } = this.props;

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
          suggestions.length > 0 && (
            <div className="bank-query">
              {
                suggestions && suggestions.map((suggestion, i) => (
                  <button
                  key={i}  
                  onClick={this.handleSearch} 
                  className="drop-list btn">{suggestion.word}</button>
                ))
              }
            </div>
          )
        }
        {
          topSearched.length > 0 ? (
            <div className="searched-wrapper">
              <div className="container-header center">Top Searched</div>
              <div className="searched-words">
              {
                topSearched && topSearched.map((word, i) => (
                  <button key={i} className="search" onClick={this.handleSearch}>{word}</button>
                ))
              }
              </div>
            </div>
          ): ''
        }
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
  const {rhymingWords, topSearched} = state;
  return {rhymingWords, topSearched};
}

export default connect(mapStateToProps)(HomePage);
