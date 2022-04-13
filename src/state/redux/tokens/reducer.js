const initialState = {
  tokens: {},
  tokenFetchErr: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TOKENS":
      return { ...state, tokens: action.tokens, tokenFetchErr: null }
    case "FETCH_TOKEN_FAILED":
      // We do not reset the tokens
      return { ...state, tokenFetchErr: action.err }
    default:
      return { ...state };
  }
}
