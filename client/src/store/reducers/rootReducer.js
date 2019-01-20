const initState = {
  rhymingWords: [],
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

    default: return state;
  }
}

export default rootReducer;
