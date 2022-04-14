import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useDefaultDatabaseUrl } from '../hooks/database';

function DataFetcher() {
  const dispatch = useDispatch();
  const defaultDatabaseUrl = useDefaultDatabaseUrl();
  const [databaseUrl, setDatabaseUrl] = useState(defaultDatabaseUrl);

  let fetchData = () => {
    dispatch({ type: "FETCH_TOKENS", databaseUrl });
  }

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

      <button type="submit" className="text-white bg-blue-700 dark:bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={fetchData} id="getTokenButton">
        Get Tokens
      </button>
    </div>
  );
}

export default DataFetcher;
