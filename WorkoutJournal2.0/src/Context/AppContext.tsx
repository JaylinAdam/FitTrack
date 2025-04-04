import React, {
    createContext,
    useState,
    ReactNode,
    useMemo,
    useContext,
    useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session, Exercise } from '../../models';
import { Tools } from '.';

interface AppState {
    sessions: Session[];
    setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    selectedIndex: number;
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
    targetSession: Session | undefined;
    todaySession: Session | undefined;
    CURRENT_DATE: string;
    TARGET_DATE: string;
    selectCard: (index: number) => void;
    unSelectCard: () => void;
    handleExSubmit: (exercise: Exercise, exerciseIndex: number) => void;
    handleExDelete: (exerciseIndex: number) => void;
}

const defaultState: AppState = {
    sessions: [],
    setSessions: () => {},
    selected: '',
    setSelected: () => {},
    visible: false,
    setVisible: () => {},
    selectedIndex: -1,
    setSelectedIndex: () => {},
    targetSession: undefined,
    todaySession: undefined,
    CURRENT_DATE: '',
    TARGET_DATE: '',
    selectCard: () => {},
    unSelectCard: () => {},
    handleExSubmit: () => {},
    handleExDelete: () => {},
};

const AppContext = createContext<AppState>(defaultState);

const AppProvider = ({ children }: { children: ReactNode }) => {
    // states
    const [sessions, setSessions] = useState<Session[]>([]);
    const [selected, setSelected] = useState('');
    const [visible, setVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [storageLoading, setStorageLoading] = useState(true);

    // global variable
    const CURRENT_DATE = Tools.formatDate(new Date());
    const TARGET_DATE = Tools.hasValue(selected) ? selected : CURRENT_DATE;

    // METHOD: Get Session from date supplied
    const focusSession = (date: string) => {
        const focusIndex = sessions?.findIndex(s => s.date === date);
        return focusIndex !== -1 ? sessions[focusIndex] : undefined;
    };

    // MEMO: targeted session
    const targetSession = useMemo(() => {
        return focusSession(TARGET_DATE);
    }, [sessions, selected]);

    // MEMO: today's session
    const todaySession = useMemo(() => {
        return focusSession(CURRENT_DATE);
    }, [sessions, selected]);

    // METHOD: Select Exercise Card to Display Options Menu
    const selectCard = (index: number) => {
        setSelectedIndex(index);
    };

    const unSelectCard = () => {
        setSelectedIndex(-1);
    };

    // METHOD: Handle submission of exercise to session state
    const handleExSubmit = (exercise: Exercise, exerciseIndex: number) => {
        const sessionIndex = sessions?.findIndex(s => s.date === TARGET_DATE);

        var sessionList = [];
        // if session targeted
        if (sessionIndex >= 0) {
            sessionList = [...sessions];
            // if exercise targeted
            if (exerciseIndex >= 0) {
                // update existing exercise
                sessionList[sessionIndex].exercises[exerciseIndex] = exercise;
            } else {
                // append exercise to list
                sessionList[sessionIndex].exercises = [
                    ...sessionList[sessionIndex].exercises,
                    exercise,
                ];
            }
        } else {
            // create session if it does not exist
            const newSession = new Session('', TARGET_DATE, '', [exercise]);
            sessionList = [...sessions, newSession];
        }
        // update session state
        setSessions(sessionList);
        // update local storage
        saveData(sessionList);
        setVisible(false);
    };

    // METHOD: Handle deletion of exercise from session state
    const handleExDelete = (exerciseIndex: number) => {
        const sessionIndex = sessions?.findIndex(s => s.date === TARGET_DATE);

        var sessionList = [...sessions];
        // if session targeted
        if (sessionIndex >= 0) {
            // if exercise targeted
            if (exerciseIndex >= 0) {
                // remove exercise from list
                sessionList[sessionIndex] = {
                    ...sessionList[sessionIndex],
                    exercises: sessionList[sessionIndex].exercises.filter(
                        (_, index) => index !== exerciseIndex,
                    ),
                };
            }
            // if no exercises in session
            if (sessionList[sessionIndex].exercises.length === 0) {
                // remove session from list
                sessionList = sessionList.filter(
                    (_, index) => index !== sessionIndex,
                );
            }
        }
        // update session state
        setSessions(sessionList);
        // update local storage
        saveData(sessionList);
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
                selectedIndex,
                setSelectedIndex,
                CURRENT_DATE,
                TARGET_DATE,

                targetSession,
                todaySession,
                handleExSubmit,
                handleExDelete,
                selectCard,
                unSelectCard,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useApp = () => useContext(AppContext);

export { AppProvider, useApp };
