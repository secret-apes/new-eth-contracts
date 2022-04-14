import { useState, useEffect } from 'react';

function copyTextToClipboard(text, html) {
  if (!navigator.clipboard) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    var successful = false;
    try {
      successful = document.execCommand("copy");
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }
    document.body.removeChild(textArea);
    return successful;
  }
  try {
    navigator.clipboard.write([
      new window.ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([text], { type: 'text/plain' })
      })
    ]);
    return true;
  } catch (err) {
    console.error("Failed to write text", err);
    return false;
  }
}

function CopySnippetButton({ text, html }) {
  let [buttonText, setButtonText] = useState('Copy Snippet');

  useEffect(() => {
    if (buttonText !== "Copy Snippet") {
      let resetButtonTextTimer = setTimeout(() => setButtonText("Copy Snippet"), 3000);
      return () => clearTimeout(resetButtonTextTimer);
    }
  }, [buttonText]);

  let handleCopySnippet = () => {
    let success = copyTextToClipboard(text, html);
    if (success) {
      setButtonText('Copied');
    } else {
      setButtonText('Copy Failed');
    }
  }

  return (
    <button type="button" data-copy-state="copy" className="flex items-center px-4 py-2 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 dark:text-slate-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 copy-to-clipboard-button" onClick={handleCopySnippet}>
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> <span className="copy-text">{buttonText}</span>
    </button>
  );
}

export default CopySnippetButton;
