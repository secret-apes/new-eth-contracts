import { useStatusMessage } from '../hooks/settings';

function StatusMessage() {
  const message = useStatusMessage();
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden md:max-w-3xl my-12">
      <div className="p-8 my-auto">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Status Messages
        </div>
        <p className="mt-2 text-sm text-black" id="textualOutputSection" style={{ whiteSpace: "pre" }}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default StatusMessage;
