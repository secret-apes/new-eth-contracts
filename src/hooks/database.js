import { useMemo } from 'react';
import { useSelector } from "react-redux";

// Make objects filterable
Object.filter = (obj, predicate) =>
  Object.fromEntries(Object.entries(obj).filter(predicate));

function useDefaultDatabaseUrl() {
  const databaseUrl = useSelector((store) => store.SettingsReducer.defaultDatabaseUrl);
  return databaseUrl;

}
function isTokenBookmarked(address) {
  return localStorage.getItem(`token-${address}`) !== null;
}

function useTokens() {
  const tokens = useSelector((store) => store.TokensReducer.tokens);
  const err = useSelector((store) => store.TokensReducer.tokenFetchErr);
  return [tokens, err];
}

function useFilteredTokens() {
  const tokens = useSelector((store) => store.TokensReducer.tokens);
  const filters = useSelector((store) => store.SettingsReducer.filter);

  let filteredTokens = useMemo(() => {
    return Object.filter(tokens, token => {

      let data = token[1];

      if (filters.launched !== null && !!filters.launched !== !!data.launched) {
        return false;
      }

      if (filters.mayberug !== null && !!filters.mayberug !== !!data.rugtxs) {
        return false;
      }

      if (filters.stealth !== null && !!filters.stealth !== !!data.stealth) {
        return false;
      }

      if (filters.approvals && filters.approvals > data.approves) {
        return false;
      }

      if (filters.start_date && filters.start_date > data.created) {
        return false;
      }

      if (filters.deployer_age && filters.deployer_age <= data.age * 1000) {
        return false;
      }

      // Bookmark is different and the state is saved in localStorage
      if (filters.marked !== null && !!filters.marked !== !!isTokenBookmarked(token[0])) {
        return false;
      }

      return true;

    })
  }, [tokens, filters]);
  return filteredTokens;
}


export { useDefaultDatabaseUrl, useTokens, useFilteredTokens, isTokenBookmarked };