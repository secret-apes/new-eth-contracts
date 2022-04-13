import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLoginStatus } from './hooks/metamask';
import { useFilteredTokens } from "./hooks/database";
import DataFetcher from './components/DataFetcher';
import GateKeeper from './components/GateKeeper';
import TokenSnippet from './components/TokenSnippet';
import SettingsPanel from './components/SettingsPanel';
import StatusMessage from './components/StatusMessage';

function App() {
  const dispatch = useDispatch();
  const loggedIn = useLoginStatus();
  const tokens = useFilteredTokens();

  useEffect(() => {
    dispatch({ type: "LOAD_DEFAULT_DATABASE_URL" });
    dispatch({ type: "LOAD_DEFAULT_FILTERS" });
  }, [dispatch]);

  useEffect(() => {
    let tokensCount = Object.keys(tokens).length;
    if (tokensCount) {
      dispatch({ type: "SET_STATUS_MESSAGE", msg: `Displaying ${tokensCount} (filtered) tokens.` })
    }
  }, [dispatch, tokens]);

  if (!loggedIn) {
    return <div className='flex justify-center items-center h-screen'>
      <div className='grid grid-cols-1 place-content-center'>
        <GateKeeper />
      </div>
    </div>;
  }

  var tokenSnippets = [];
  for (const [address, tokenData] of Object.entries(tokens).reverse()) {
    tokenSnippets.push((
      <TokenSnippet key={address} address={address} tokenData={tokenData} />
    ));
  }

  return (
    <div>
      <div className="mx-auto px-10 md:px-6 lg:px-3 md:max-w-xl lg:max-w-3xl pt-12">
        <GateKeeper />
        <DataFetcher />
        <SettingsPanel />
        <StatusMessage />
      </div>

      <div className="px-6 mx-auto md:max-w-max pb-12">
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
