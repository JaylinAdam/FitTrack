import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from 'react';
import { Appearance } from 'react-native';
import { ColorScheme as Color } from '../../models';

interface Theme {
    text: {
        primary?: string;
        secondary?: string;
        tertiary?: string;
        quaternary?: string;
        accent?: string;
    };
    background: {
        primary?: string;
        secondary?: string;
        tertiary?: string;
        quaternary?: string;
        accent?: string;
    };
    opacity: {
        light?: string;
        heavy?: string;
    };
    button: {
        add?: string;
        submit?: string;
        close?: string;
        disabled?: string;
    };
}

const themes = {
    light: {
        text: {
            primary: '#000000',
            secondary: '#000000',
            tertiary: '',
            accent: '',
            quaternary: '#ffffff', // flip of theme
        },
        background: {
            primary: '#ffffff',
            secondary: '#ffffff',
            tertiary: '',
            accent: '',
            quaternary: '',
        },
        opacity: {
            light: '',
            dark: '',
        },
        button: {
            add: '#ff6d5d',
            submit: '#34b233',
            close: '#E3252B',
            disabled: '#a5a5a5',
        },
    },
    dark: {
        text: {
            primary: '#ffffff',
            secondary: '#ffffff',
            tertiary: '#92a6b9',
            quaternary: '#000000',
            accent: '#64bdff',
        },
        background: {
            primary: '#101518',
            secondary: '#1a2227',
            tertiary: '#33424b',
            quaternary: '',
            accent: '#64bdff',
        },
        opacity: {
            light: '',
            dark: '',
        },
        button: {
            add: '#ff6d5d',
            submit: '#83ff73',
            close: '#E3252B',
            disabled: '#a5a5a5',
        },
    },
};

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
}

const defaultState: ThemeState = {
    theme: themes.light,
    toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeState>(defaultState);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const colorScheme = Appearance.getColorScheme();

    const [theme, setTheme] = useState<Theme>(
        colorScheme === Color.dark ? themes.dark : themes.light,
    );

    // Listen for system theme changes
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme === Color.dark ? themes.dark : themes.light);
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
