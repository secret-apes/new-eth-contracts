import { all } from "redux-saga/effects";
import { watchSettingsApp } from "./redux/settings";
import { watchTokensApp } from "./redux/tokens";
import { watchMetamaskApp } from "./redux/metamask";

export default function* rootSagas() {
    yield all([watchMetamaskApp(), watchSettingsApp(), watchTokensApp()]);
}


