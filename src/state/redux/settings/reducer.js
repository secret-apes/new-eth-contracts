const initialState = {
    defaultDatabaseUrl: '',
    filter: {
        launched: null,
        stealth: null,
        mayberug: null,
        marked: null,
        start_date: 0,
        deployer_age: 0,
        approvals: null,
    },
    statusMessage: 'No status messages yet'
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_DEFAULT_DATABASE_URL":
            return { ...state, defaultDatabaseUrl: action.url };
        case "SET_FILTER":
            return { ...state, filter: { ...state.filter, ...action.filter } };
        case "SET_STATUS_MESSAGE":
            return { ...state, statusMessage: action.msg };
        case "APPEND_STATUS_MESSAGE":
            return { ...state, statusMessage: `${state.statusMessage}\r\n${action.msg}` };
        default:
            return { ...state };
    }
}
