import { useDispatch } from "react-redux";
import { useFilterSettings } from '../../hooks/settings';


function DatePickerSetting({ id, label }) {
  const dispatch = useDispatch();
  const filterValue = useFilterSettings(id);

  let handleChange = (e) => {
    let filterUpdate = {};
    filterUpdate[id] = e.target.value;
    dispatch({ type: "SET_FILTER", filter: filterUpdate });
  }

  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{label}</label>
      <div className="relative">
        {/* <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"></path>
          </svg>
        </div> */}
        <input datepicker="true" type="date" id={id}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          datepicker-format="mm-dd-yyyy" placeholder="Select date" onChange={handleChange} value={filterValue}/>
      </div>
    </div>
  );
}

export default DatePickerSetting;
