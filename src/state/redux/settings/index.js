import { select, takeLatest, put } from 'redux-saga/effects'

const getFilter = state => state.SettingsReducer.filter;

function* saveFilter() {
    const filter = yield select(getFilter);
    localStorage.setItem('filter_settings', JSON.stringify(filter));
    yield put({ type: 'APPEND_STATUS_MESSAGE', msg: `Filter settings saved.` });
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

export function* watchSettingsApp() {
    yield takeLatest("SAVE_FILTERS", saveFilter);
    yield takeLatest("LOAD_DEFAULT_FILTERS", loadDefaultFilter);
    yield takeLatest("LOAD_DEFAULT_DATABASE_URL", loadDefaultDatabaseUrl);
}
