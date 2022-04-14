import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isTokenBookmarked } from '../../hooks/database';

function BookmarkButton({ address, tokenInfo }) {
  const dispatch = useDispatch();
  // Won't auto-update because not listening to localStorage
  const bookmarked = isTokenBookmarked(address);
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    if (bookmarked !== marked) {
      setMarked(bookmarked);
    }
  }, [bookmarked, marked]);

  let handleBookmark = () => {
    if (!bookmarked) {
      dispatch({ type: 'MARK_TOKEN_INFO', address, tokenInfo });
      setMarked(true);
    } else {
      dispatch({ type: 'UNMARK_TOKEN_INFO', address });
      setMarked(false);
    }
  }

  var fillColor = marked ? '#ffa003' : 'none';
  var strokeColor = marked ? '#ffa003' : 'currentColor';

  return (
    <button type="button" data-copy-state="copy" className="flex items-center px-3 py-2 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={handleBookmark}>
      <svg className="w-4 h-4" fill={fillColor} stroke={strokeColor} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
    </button>
  );
}

export default BookmarkButton;