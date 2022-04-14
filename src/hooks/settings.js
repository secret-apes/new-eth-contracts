import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useColorScheme as useSystemColorScheme } from '@mantine/hooks';

function useFilterSettings(id) {
    const filter = useSelector((store) => store.SettingsReducer.filter);
    if (id) return filter[id];
    return filter;
}

function useStatusMessage() {
    const statusMessage = useSelector((store) => store.SettingsReducer.statusMessage);
    return statusMessage;
}

function useColorScheme() {
    let systemColorScheme = useSystemColorScheme();
    let [isDark, setIsDark] = useState(false);

    useEffect(() => {
        let colorScheme = localStorage.getItem('color-scheme');
        if (colorScheme === 'dark') {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else if (colorScheme !== 'light') {
            // Default to system preference
            if (systemColorScheme === 'dark') {
                setIsDark(true);
                document.documentElement.classList.add('dark');
            }
        }
    }, [systemColorScheme]);

    let toggleColorScheme = () => {
        let colorScheme = localStorage.getItem('color-scheme');
        // Prioritizes user preference
        if (colorScheme) {
            if (colorScheme === 'dark') {
                setIsDark(false);
                localStorage.setItem('color-scheme', 'light');
                document.documentElement.classList.remove('dark');
            } else if (colorScheme === 'light') {
                setIsDark(true);
                localStorage.setItem('color-scheme', 'dark');
                document.documentElement.classList.add('dark');
            } else {
                console.error(`User color scheme preference not supported: ${colorScheme}.`);
                console.info(`Default to system color theme preference: ${systemColorScheme}`);
                if (systemColorScheme === 'dark') {
                    setIsDark(false);
                    document.documentElement.classList.remove('dark');
                } else {
                    setIsDark(true);
                    document.documentElement.classList.add('dark');
                }
            }
        } else {
            if (isDark) {
                setIsDark(false);
                localStorage.setItem('color-scheme', 'light');
                document.documentElement.classList.remove('dark');
            } else {
                setIsDark(true);
                localStorage.setItem('color-scheme', 'dark');
                document.documentElement.classList.add('dark');
            }
        }
    }

    return [isDark, toggleColorScheme];
}

export { useFilterSettings, useStatusMessage, useColorScheme };