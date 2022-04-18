import { useDispatch } from "react-redux";
import { useFilterSettings } from '../../hooks/settings';

function BooleanToggle({ id, label, autoSave }) {
  const dispatch = useDispatch();
  const filterValue = useFilterSettings(id) || '';

  let handleChange = (e) => {
    let filterUpdate = {};
    filterUpdate[id] = e.target.checked;
    if (autoSave) {
      dispatch({ type: "SET_AND_SAVE_FILTERS", filter: filterUpdate });
    } else {
      dispatch({ type: "SET_FILTER", filter: filterUpdate });
    }
  }

  return (
    <label htmlFor={id} className="flex relative items-center cursor-pointer">
      {
        filterValue ?
          <input type="checkbox" id={id} className="sr-only" defaultChecked onChange={handleChange} /> :
          <input type="checkbox" id={id} className="sr-only" onChange={handleChange} />
      }
      <div className="w-11 h-6 bg-gray-200 rounded-full border border-gray-200 toggle-bg dark:bg-gray-700 dark:border-gray-600">
      </div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
    </label>
  );
}

export default BooleanToggle;
