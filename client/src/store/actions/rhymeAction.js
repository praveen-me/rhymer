const rhymeAction = {
  getRhymingWords: (word, cb) => (dispatch) => {
    return fetch(`https://api.datamuse.com/words?rel_rhy=${word}`)
      .then(res => res.json())
      .then((data) => {
        dispatch({
          type: 'SET_RHYM_WORDS',
          rhymingWords: data.length > 0 ? data.length > 10 ? data.slice(0, 10) :[...data] : [],
        });
        return cb(true);
      });
  },
  addSearchedToDB: (word) => {
    console.log(word)
    return (dispatch) => {
      fetch(`/api/top-searched?word=${word}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch({
        type: ' ugftu',
      });
    };
  },
  getTopSearched: (cb) => (dispatch) => {
    fetch('/api/top-searched')
      .then(res => res.json())
      .then(data => {
        cb(true);
        dispatch({
          type: 'SET_TOP_SEARCHED',
          topSearched: data.topSearched
        })
      })
      .catch(err => {
        dispatch({
          type: 'ERR_TOP_SEARCHED',
          topSearched: err
        })
      })
  }
};

export default rhymeAction;
