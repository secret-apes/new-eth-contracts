const initialState = {
  loggedIn: false,
  accounts: [],
  allowlist: new Set() // encrypted
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, loggedIn: true, accounts: action.accounts };
    case "LOGOUT":
      return { ...state, loggedIn: false, accounts: [] };
    case "SET_ALLOWLIST":
      return { ...state, allowlist: action.allowlist };
    default:
      return { ...state };
  }
}
