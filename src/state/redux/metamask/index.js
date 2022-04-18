import { call, put, takeLatest } from "redux-saga/effects";
import axios from 'axios';

async function getAllowlistImpl(databaseUrl) {
  try {
    const { data, status, statusText } = await axios.get(`./encrypted-allowlist.txt`);
    if (status === 200) {
      return [data, null];
    } else {
      return [null, statusText];
    }
  } catch (err) {
    return [null, err];
  }
}


function* fetchAllowlist() {
  try {
    const [data, err] = yield call(getAllowlistImpl);
    if (err) {
      console.error("Failed to fetch allowlist:".err);
    } else if (!data) {
      console.error("Allowlist is empty");
    } else {
      var allowlist = new Set();
      for (var addr of data.split("\n")) {
        addr = addr.trim();
        if (addr) {
          allowlist.add(addr);
        }
      }
      yield put({ type: "SET_ALLOWLIST", allowlist });
      // console.info("Fetched allowlist: ", allowlist);
    }
  } catch (err) {
    console.error("Failed to fetch allowlist:".err);
  }
}

export function* watchMetamaskApp() {
  yield takeLatest("FETCH_ALLOWLIST", fetchAllowlist);
}