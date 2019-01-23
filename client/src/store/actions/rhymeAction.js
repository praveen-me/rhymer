const URI = 'https://api.datamuse.com/words'

const rhymeAction = {
  getRhymingWords: (word, cb) => (dispatch) => {
    return fetch(`${URI}?rel_rhy=${word}`, {
      method: 'GET',
      headers: {
        'Access-Control-Request-Method': 'GET'
      }
    })
      .then(res => res.json())
      .then((data) => {
        dispatch({
          type: 'SET_RHYM_WORDS',
          rhymingWords: data.length > 0 ? data.length > 10 ? data.slice(0, 10) :[...data] : [],
        });
        return cb(true);
      })
      .catch(() => console.log("Can’t access " + URI + " response. Blocked by browser?"))
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
