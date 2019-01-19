const initState = {
  rhymWords: [],
};

function rootReducer(state = initState, action) {
  switch (action.type) {
    case 'SET_RHYM_WORDS': {
      const { rhymWords } = action;
      return {
        ...state,
        rhymWords
      };
    }

    default: return state;
  }
}

export default rootReducer;
