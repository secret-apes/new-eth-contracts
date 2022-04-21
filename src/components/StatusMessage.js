import { useStatusMessage } from '../hooks/settings';

function StatusMessage() {
  const message = useStatusMessage();
  return (
    <div className="flex flex-wrap max-w-3xl mx-auto bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl overflow-hidden md:max-w-3xl my-12">
      <div className="p-8 my-auto block">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Status Messages
        </div>
        <p className="mt-2 text-sm text-black dark:text-slate-400 whitespace-pre-line" id="textualOutputSection" style={{ whiteSpace: "pre-wrap" }}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default StatusMessage;
