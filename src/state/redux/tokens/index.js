import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from 'axios';

async function getTokensImpl(databaseUrl) {
  try {
    const { data, status, statusText } = await axios.get(`${databaseUrl}?${Date.now()}`);
    if (status === 200) {
      return [data, null];
    } else {
      return [null, statusText];
    }
  } catch (err) {
    return [null, err];
  }
}

function* markTokenImpl({ address, tokenInfo }) {
  yield localStorage.setItem(`token-${address}`, JSON.stringify(tokenInfo));
}

function* unmarkTokenImpl({ address }) {
  yield localStorage.removeItem(`token-${address}`);
}

function* fetchTokens({ databaseUrl }) {
  if (!databaseUrl) return;
  try {
    yield put({ type: 'SET_STATUS_MESSAGE', msg: `Fetching tokens...` })
    const [data, err] = yield call(getTokensImpl, databaseUrl);
    if (err) {
      yield put({ type: "FETCH_TOKEN_FAILED", err });
      yield put({
        type: 'APPEND_STATUS_MESSAGE',
        msg: `Failed to fetch tokens: ${err}`
      });
    } else if (typeof (data) !== 'object') {
      yield put({ type: "FETCH_TOKEN_FAILED", err: new Error("response data is not json") });
      yield put({ type: "APPEND_STATUS_MESSAGE", msg: `Failed to fetch tokens. Response not json.` });
    } else {
      var fundingSources = Array.from(new Set(Object.entries(data).map(d => d[1].cex)));
      fundingSources = fundingSources.map(x => x.replace(/\d+$/, '').trim());
      fundingSources = fundingSources.filter(x => x.length > 0);
      fundingSources = Array.from(new Set(fundingSources)).sort();
      yield put({ type: "SET_FUNDING_SOURCES", fundingSources });
      yield put({ type: "SET_TOKENS", tokens: data });
      yield put({
        type: 'APPEND_STATUS_MESSAGE',
        msg: `Fetched ${Object.keys(data).length} (unfiltered) tokens from database`
      });
      if (localStorage.dburl !== databaseUrl) {
        localStorage.setItem('dburl', databaseUrl);
        console.info(`Saved working database url to local storage for future use: ${databaseUrl}`);
      }
    }
  } catch (err) {
    yield put({ type: "FETCH_TOKEN_FAILED", err });
    yield put({
      type: 'APPEND_STATUS_MESSAGE',
      msg: `Failed to fetch tokens: ${err}`
    });
  }
}

export function* watchTokensApp() {
  yield takeLatest("FETCH_TOKENS", fetchTokens);
  yield takeEvery("MARK_TOKEN_INFO", markTokenImpl);
  yield takeEvery("UNMARK_TOKEN_INFO", unmarkTokenImpl);
}