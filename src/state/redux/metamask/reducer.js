const initialState = {
  loggedIn: false,
  accounts: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, loggedIn: true, accounts: action.accounts };
    case "LOGOUT":
      return { ...state, loggedIn: false, accounts: [] };
    default:
      return { ...state };
  }
}
