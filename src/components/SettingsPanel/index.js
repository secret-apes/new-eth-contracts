import { useDispatch } from "react-redux";

import Trilean from './Trilean';
import DatePicker from './DatePicker';
import NumericInput from './NumericInput';
import DropdownSelect from './DropdownSelect';
import SearchBox from './SearchBox';
import { useFundingSources } from '../../hooks/database';


function SettingsPanel() {
  const dispatch = useDispatch();
  const fundingSources = useFundingSources();

  let handleRememberFilter = (e) => {
    dispatch({ type: "SAVE_FILTERS" });
  }

  return (
    <div id="filterForm">
      <div className="my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Trilean id="launched" label="Launched" />
        <Trilean id="stealth" label="Stealth" />
        <Trilean id="mayberug" label="Maybe Rugger" />
        <Trilean id="marked" label="Bookmarked" />
        <DatePicker id="start_date" label="Start Date" />
        <DatePicker id="deployer_date" label="Deployer Date" />
        <NumericInput id="approvals" label="Minimum Approvals" />
        <NumericInput id="min_deployer_balance" label="Min Deployer Balance" />
        <DropdownSelect id="cex" label="Funding Sources" options={fundingSources} />
        <SearchBox id="tokenName" label="Token Name" />
      </div>

      {/* <div className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 dark:text-stone-200 dark:bg-yellow-700 rounded-lg dark:bg-yellow-200 dark:text-yellow-800" role="alert">
        <span className="font-medium">Coming Soon!</span> Date Picker filters are not implemented yet.
      </div> */}

      <button
        className="text-white bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-400 dark:focus:ring-green-600" onClick={handleRememberFilter}>Save Filters</button>
    </div>
  );
}

export default SettingsPanel;
