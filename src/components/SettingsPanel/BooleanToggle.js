import { useDispatch } from "react-redux";

function BooleanToggle({ id, label }) {
  const dispatch = useDispatch();

  let handleChange = (e) => {
    let filterUpdate = {};
    filterUpdate[id] = e.target.checked;
    dispatch({ type: "SET_FILTER", filter: filterUpdate });
  }

  return (
    <label htmlFor={id} className="flex relative items-center mb-4 cursor-pointer">
      <input type="checkbox" id={id} className="sr-only" defaultChecked onChange={handleChange} />
      <div className="w-11 h-6 bg-gray-200 rounded-full border border-gray-200 toggle-bg dark:bg-gray-700 dark:border-gray-600">
      </div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
    </label>
  );
}

export default BooleanToggle;
