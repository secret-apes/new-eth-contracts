import { select, takeLatest, put, call } from 'redux-saga/effects'

const getFilter = state => state.SettingsReducer.filter;
const getAutoRefresh = state => state.SettingsReducer.autoRefresh;

function* saveFilter() {
    const filter = yield select(getFilter);
    localStorage.setItem('filter_settings', JSON.stringify(filter));
    yield put({ type: 'APPEND_STATUS_MESSAGE', msg: `Filter settings saved.` });
}

function* setAndSaveFilter({ filter }) {
    yield put({ type: 'SET_FILTER', filter });
    yield call(saveFilter);
}

function* loadDefaultDatabaseUrl() {
    console.info("Fetching dburl from local storage");
    let dburl = localStorage.getItem('dburl') || '';
    if (dburl) {
        console.info("Loaded save dburl from local storage:", dburl);
    } else {
        console.info("No saved dburl in local storage");
    }
    yield put({ type: 'SET_DEFAULT_DATABASE_URL', url: dburl });
}

function* loadDefaultFilter() {
    console.info("Loading saved filter settings from local storage");
    if (!!localStorage.filter_settings) {
        try {
            let filter = JSON.parse(localStorage.filter_settings);
            console.log("Saved filter loaded:", filter);
            yield put({ type: 'SET_FILTER', filter });
            yield put({ type: 'APPEND_STATUS_MESSAGE', msg: `Loaded filter settings.` });
        } catch (error) {
            console.error("Failed to load filter settings", error);
        }
    } else {
        console.log("No saved filter settings found.");
    }
}

function* toggleAutoRefresh() {
    const isAutoRefresh = yield select(getAutoRefresh);
    yield put({ type: 'SET_AUTO_REFRESH', autoRefresh: !isAutoRefresh });
    localStorage.setItem('autoRefresh', !isAutoRefresh);
}

function* loadAutoRefreshPreference() {
    if (localStorage.autoRefresh === 'true') {
        yield put({ type: 'SET_AUTO_REFRESH', autoRefresh: true });
    }
}

export function* watchSettingsApp() {
    yield takeLatest("SAVE_FILTERS", saveFilter);
    yield takeLatest("SET_AND_SAVE_FILTERS", setAndSaveFilter);
    yield takeLatest("TOGGLE_AUTO_REFRESH", toggleAutoRefresh);
    yield takeLatest("LOAD_DEFAULT_FILTERS", loadDefaultFilter);
    yield takeLatest("LOAD_AUTO_REFRESH_PREFERENCE", loadAutoRefreshPreference);
    yield takeLatest("LOAD_DEFAULT_DATABASE_URL", loadDefaultDatabaseUrl);
}
