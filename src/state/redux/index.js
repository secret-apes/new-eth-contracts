import { combineReducers } from "redux";
import MetamaskReducer from './metamask/reducer';
import SettingsReducer from './settings/reducer'
import TokensReducer from './tokens/reducer';

const reducers = combineReducers({
    MetamaskReducer,
    SettingsReducer,
    TokensReducer,
});

export default reducers;
