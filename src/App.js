import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLoginStatus } from './hooks/metamask';
import { useFilteredTokens } from "./hooks/database";
import DataFetcher from './components/DataFetcher';
import GateKeeper from './components/GateKeeper';
import DarkModeToggle from './components/DarkModeToggle';
import TokenSnippet from './components/TokenSnippet';
import SettingsPanel from './components/SettingsPanel';
import StatusMessage from './components/StatusMessage';

function App() {
  const dispatch = useDispatch();
  const loggedIn = useLoginStatus();
  const tokens = useFilteredTokens();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALLOWLIST' });
    dispatch({ type: "LOAD_DEFAULT_DATABASE_URL" });
    dispatch({ type: "LOAD_DEFAULT_FILTERS" });
    dispatch({ type: "LOAD_AUTO_REFRESH_PREFERENCE" });
  }, [dispatch]);

  useEffect(() => {
    let tokensCount = Object.keys(tokens).length;
    let now = new Date();
    if (tokensCount) {
      dispatch({ type: "SET_STATUS_MESSAGE", msg: `Displaying ${tokensCount} (filtered) tokens. (${now.toISOString()})` })
    } else {
      dispatch({ type: "SET_STATUS_MESSAGE", msg: `No tokens available for display.` })
    }
  }, [dispatch, tokens]);

  if (!loggedIn) {
    return (
      <div className='flex justify-center items-center h-screen bg-white dark:bg-slate-900'>
        <div className='grid grid-cols-1 place-content-center'>
          <GateKeeper />
        </div>
        <DarkModeToggle />
      </div>
    );
  }

  var tokenSnippets = [];
  for (const [address, tokenData] of Object.entries(tokens).reverse()) {
    tokenSnippets.push((
      <TokenSnippet key={address} address={address} tokenData={tokenData} />
    ));
  }

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      <div className="mx-auto px-10 md:px-6 lg:px-3 md:max-w-xl lg:max-w-3xl pt-12">
        <div className="flex justify-between">
          <GateKeeper />
          <DarkModeToggle />
        </div>
        <DataFetcher />
        <SettingsPanel />
        <StatusMessage />
      </div>

      <div className="md:px-6 mx-auto md:max-w-max pb-12">
        {/* <!-- Display Tokens in three columns --> */}
        <div className="my-6 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" id="tokenList">
          {/* <!-- Token data will go here --> */}
          {tokenSnippets}
        </div>
      </div>
    </div>
  );
}

export default App;
