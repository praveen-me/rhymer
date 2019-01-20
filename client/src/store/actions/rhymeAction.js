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
};

export default rhymeAction;
