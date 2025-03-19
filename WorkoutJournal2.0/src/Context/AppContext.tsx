import React, {
    createContext,
    useState,
    ReactNode,
    useMemo,
    useContext,
    useEffect,
} from 'react';
import { Session, Exercise } from '../../models';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
    sessions: Session[];
    setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    targetSession: Session | undefined;
    todaySession: Session | undefined;
    CURRENT_DATE: string;
    TARGET_DATE: string;
    hasValue: (value: string | undefined) => boolean;
    handleExSubmit: (exercise: Exercise, exerciseIndex: number) => void;
}

const defaultState: AppState = {
    sessions: [],
    setSessions: () => {},
    selected: '',
    setSelected: () => {},
    visible: false,
    setVisible: () => {},
    targetSession: undefined,
    todaySession: undefined,
    CURRENT_DATE: '',
    TARGET_DATE: '',
    hasValue: () => true,
    handleExSubmit: () => {},
};

// !! Tools (separate out later)
//#region Tools to be moved
const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const hasValue = (value: string | undefined): boolean => {
    return !!value?.trim();
};
// #endregion

const AppContext = createContext<AppState>(defaultState);

const AppProvider = ({ children }: { children: ReactNode }) => {
    // states
    const [sessions, setSessions] = useState<Session[]>([]);
    const [selected, setSelected] = useState('');
    const [visible, setVisible] = useState(false);
    const [storageLoading, setStorageLoading] = useState(true);

    // global variable
    const currentDate = () => formatDate(new Date());
    const CURRENT_DATE = currentDate();

    const targetDate = () => (hasValue(selected) ? selected : CURRENT_DATE);
    const TARGET_DATE = targetDate();

    // MEMO: targeted session
    const targetSession = useMemo(() => {
        const focusIndex = sessions?.findIndex(s => s.date === TARGET_DATE);
        return focusIndex !== -1 ? sessions[focusIndex] : undefined;
    }, [sessions, selected]);

    // MEMO: today's session
    const todaySession = useMemo(() => {
        const focusIndex = sessions?.findIndex(s => s.date === CURRENT_DATE);
        return focusIndex !== -1 ? sessions[focusIndex] : undefined;
    }, [sessions, selected]);

// METHOD: Handle submission of exercise to session state
    const handleExSubmit = (exercise: Exercise, exerciseIndex: number) => {
        const sessionIndex = sessions?.findIndex(s => s.date === TARGET_DATE);

        // if session exists
        if (sessionIndex >= 0) {
            const sessionList = [...sessions];

            if (exerciseIndex >= 0) {
                sessionList[sessionIndex].exercises[exerciseIndex] = exercise;
            } else {
                sessionList[sessionIndex].exercises = [
                    ...sessionList[sessionIndex].exercises,
                    exercise,
                ];
            }
            setSessions(sessionList);
            saveData(sessionList);
        } else {
            const newSession = new Session('', TARGET_DATE, '', [exercise]);
            const sessionList = [...sessions, newSession];
            setSessions(sessionList);
            saveData(sessionList);
        }

        setVisible(false);
    };

    // METHOD: Save data to local storage as "SessionData" (can be viewed in Application > Local Storage > localhost)
    const saveData = async (newData: Session[]) => {
        try {
            await AsyncStorage.setItem('SessionData', JSON.stringify(newData));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    // ONLOAD: check for and load session data (if existing)
    useEffect(() => {
        // METHOD: Load data from local storage under "SessionData" and set it to session state
        const loadData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('SessionData');
                if (storedData) {
                    const parseData = JSON.parse(storedData);
                    setSessions(parseData);
                    console.log('Stored Session Data', parseData);
                }
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setStorageLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <AppContext.Provider
            value={{
                sessions,
                setSessions,
                selected,
                setSelected,
                visible,
                setVisible,

                CURRENT_DATE,
                hasValue,
                TARGET_DATE,

                targetSession,
                todaySession,
                handleExSubmit,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useApp = () => useContext(AppContext);

export { AppProvider, useApp };
