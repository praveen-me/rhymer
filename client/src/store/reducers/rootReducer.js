const initState = {
  rhymingWords: [],
  topSearched: []
};

function rootReducer(state = initState, action) {
  switch (action.type) {
    case 'SET_RHYM_WORDS': {
      const { rhymingWords } = action;
      return {
        ...state,
        rhymingWords
      };
    }
    case 'SET_TOP_SEARCHED': {
      const { topSearched } = action
      return {
        ...state,
        topSearched
      }
    }
    default: return state;
  }
}

export default rootReducer;
