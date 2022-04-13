import { useSelector } from "react-redux";

function useFilterSettings(id) {
    const filter = useSelector((store) => store.SettingsReducer.filter);
    if (id) return filter[id];
    return filter;
}

function useStatusMessage() {
    const statusMessage = useSelector((store) => store.SettingsReducer.statusMessage);
    return statusMessage;
}

export { useFilterSettings, useStatusMessage };