import { useMemo, useState } from 'react';
import { useSelector } from "react-redux";

// Make objects filterable
Object.filter = (obj, predicate) =>
  Object.fromEntries(Object.entries(obj).filter(predicate));

function useDefaultDatabaseUrl() {
  const databaseUrl = useSelector((store) => store.SettingsReducer.defaultDatabaseUrl);
  return databaseUrl;
}

function useFundingSources() {
  const fundingSources = useSelector((store) => store.TokensReducer.fundingSources);
  return fundingSources;
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
  const [filteredTokens, setFilteredTokens] = useState(tokens);

  let dateStrToTime = (val) => {
    if (val !== null && typeof (val) === 'string') {
      if (val.match(/\d{2}[-/]\d{2}[-/]\d{4}|\d{4}[-/]\d{2}[-/]\d{2}/)) {
        return (new Date(val)).getTime();
      }
    }
    return 0;
  };

  useMemo(async () => {
    return setFilteredTokens(Object.filter(tokens, token => {

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

      if (filters.start_date && dateStrToTime(filters.start_date) > data.created) {
        return false;
      }

      if (filters.deployer_date && dateStrToTime(filters.deployer_date) > data.age * 1000) {
        return false;
      }

      if (filters.min_deployer_balance && filters.min_deployer_balance > data.balance) {
        return false;
      }

      if (filters.cex && !data.cex.startsWith(filters.cex)) {
        return false;
      }

      // Bookmark is different and the state is saved in localStorage
      if (filters.marked !== null && !!filters.marked !== !!isTokenBookmarked(token[0])) {
        return false;
      }

      return true;

    }));
  }, [tokens, filters]);

  return filteredTokens;
}


export { useDefaultDatabaseUrl, useTokens, useFilteredTokens, useFundingSources, isTokenBookmarked };