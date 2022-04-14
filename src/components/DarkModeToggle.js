import { useColorScheme } from '../hooks/settings';
import { ReactComponent as MoonLogo } from '../assets/moon.svg';
import { ReactComponent as SunLogo } from '../assets/sun.svg';


function DarkModeToggle() {
  let [isDark, toggleColorScheme] = useColorScheme();

  return (
    <button id="theme-toggle" type="button" className="bg-white border border-gray-200  font-medium rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2.5 text-center inline-flex items-center dark:text-slate-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2" onClick={toggleColorScheme}>
      {isDark ? <SunLogo /> : <MoonLogo />}
    </button >
  );
}

export default DarkModeToggle;