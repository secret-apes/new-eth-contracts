import { useDispatch } from "react-redux";
import { useFilterSettings } from '../../hooks/settings';

function DropdownSelect({ id, label, options }) {
  const dispatch = useDispatch();
  const filterValue = useFilterSettings(id);

  var selectedValue = filterValue;
  if (filterValue === null) {
    selectedValue = "Don't Care";
  }

  let handleChange = (e) => {
    let filterUpdate = {};
    filterUpdate[id] = e.target.value;
    if (e.target.value === 'dc' || e.target.value === "Don't Care") {
      filterUpdate[id] = null;
    }
    dispatch({ type: "SET_FILTER", filter: filterUpdate });
  }

  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{label}</label>
      <select id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} value={selectedValue}>
        <option>Don't Care</option>
        {options.map(source => (
          <option key={source}>{source}</option>
        ))}
      </select>
    </div>
  );
}

export default DropdownSelect;
