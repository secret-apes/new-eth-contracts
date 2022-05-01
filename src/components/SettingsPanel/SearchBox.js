import { useDispatch } from "react-redux";

function SearchBox({ id, label }) {
  const dispatch = useDispatch();

  let handleChange = (e) => {
    let filterUpdate = {};
    filterUpdate[id] = e.target.value;
    dispatch({ type: "SET_FILTER", filter: filterUpdate });
  }

  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{label}</label>
      <input type="text" id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Empty for Don't Care" onChange={handleChange} />
    </div>
  );
}

export default SearchBox;
