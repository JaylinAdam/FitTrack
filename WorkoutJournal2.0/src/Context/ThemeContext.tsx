import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from 'react';
import { Appearance } from 'react-native';

type Theme = {
    text: {
        primary?: string;
        secondary?: string;
        tertiary?: string;
        accent?: string;
    };
    background: {
        primary?: string;
        secondary?: string;
        tertiary?: string;
    };
};

const themes = {
    light: {
        text: {
            primary: '#000000',
            secondary: '#000000',
        },
        background: {
            primary: '#ffffff',
            secondary: '#ffffff',
        },
    },
    dark: {
        text: {
            primary: '#ffffff',
            secondary: '#ffffff',
            tertiary: '#92a6b9',
            accent: '#64bdff',
        },
        background: {
            primary: '#101518',
            secondary: '#1a2227',
            tertiary: '#33424b',
        },
    },
};

interface ThemeState {
    theme: Theme;
    toggleTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const defaultState: ThemeState = {
    theme: themes.light,
    toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeState>(defaultState);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const colorScheme = Appearance.getColorScheme();

    const [theme, setTheme] = useState<Theme>(
        colorScheme === 'dark' ? themes.dark : themes.light,
    );

    // Listen for system theme changes
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme === 'dark' ? themes.dark : themes.light);
        });

        return () => subscription.remove();
    }, []);

    const toggleTheme = () => {
        setTheme(prevTheme =>
            prevTheme === themes.light ? themes.dark : themes.light,
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => useContext(ThemeContext);

export { Theme, ThemeProvider, useTheme };
