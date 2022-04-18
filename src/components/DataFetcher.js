import { useEffect, useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { useDefaultDatabaseUrl } from '../hooks/database';
import { useAutoRefresh } from '../hooks/settings';

const REFETCH_INTERVAL_SECONDS = 30;

function DataFetcher() {
  const dispatch = useDispatch();
  const defaultDatabaseUrl = useDefaultDatabaseUrl();
  const [databaseUrl, setDatabaseUrl] = useState(defaultDatabaseUrl);
  const isAutoRefresh = useAutoRefresh();
  const [isInitialFetch, setIsInitialFetch] = useState(true);
  const refetchTimer = useRef(null);

  let fetchData = () => {
    dispatch({ type: "FETCH_TOKENS", databaseUrl });
    setIsInitialFetch(false);
  }

  let toggleAutoRefresh = () => {
    dispatch({ type: "TOGGLE_AUTO_REFRESH" });
  }

  useEffect(() => {
    // Toggling auto-refersh button before "get tokens" button is clicked
    // does nothing. However, after the button is clicked, the expectation
    // that the toggle controls the applicataion state.
    if (!isInitialFetch) {
      if (isAutoRefresh) {
        dispatch({ type: "APPEND_STATUS_MESSAGE", msg: `Auto-refresh enabled for every ${REFETCH_INTERVAL_SECONDS} secs` });
        clearTimeout(refetchTimer.current); // clear existing timer
        refetchTimer.current = setInterval(() => {
          dispatch({ type: "FETCH_TOKENS", databaseUrl })
        }, REFETCH_INTERVAL_SECONDS * 1000);
      } else {
        dispatch({ type: "APPEND_STATUS_MESSAGE", msg: "Auto-refresh disabled" });
        clearTimeout(refetchTimer.current);
      }
    }
    return () => clearTimeout(refetchTimer.current);
  }, [isAutoRefresh, refetchTimer, isInitialFetch, databaseUrl, dispatch]);

  let autoRefetchToggle = (
    <label htmlFor="autoRefresh" className="flex relative items-center cursor-pointer">
      {
        isAutoRefresh ?
          <input type="checkbox" id="autoRefresh" className="sr-only" defaultChecked onChange={toggleAutoRefresh} /> :
          <input type="checkbox" id="autoRefresh" className="sr-only" onChange={toggleAutoRefresh} />
      }
      <div className="w-11 h-6 bg-gray-200 rounded-full border border-gray-200 toggle-bg dark:bg-gray-700 dark:border-gray-600">
      </div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Auto Refresh (every {REFETCH_INTERVAL_SECONDS} secs)</span>
    </label>
  );

  return (
    <div id="databaseForm">
      <div className="mb-6">
        <label htmlFor="database_url"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Enter Database URL
        </label>
        <input type="text" id="database_url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setDatabaseUrl(e.target.value)} placeholder={databaseUrl} value={databaseUrl} />
      </div>

      <div className='flex items-center space-x-5'>
        <button type="submit" className="text-white bg-blue-700 dark:bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={fetchData} id="getTokenButton">
          Get Tokens
        </button>

        {autoRefetchToggle}
      </div>
    </div>
  );
}

export default DataFetcher;
