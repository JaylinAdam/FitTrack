import React, {
    createContext,
    useState,
    ReactNode,
    useMemo,
    useContext,
} from 'react';
import { Session, Exercise } from '../../models';

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
    handleExSubmit: (exercise: Exercise) => void;
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

    // global variable
    const currentDate = () => formatDate(new Date());
    const CURRENT_DATE = currentDate();

    const targetDate = () => (hasValue(selected) ? selected : CURRENT_DATE);
    const TARGET_DATE = targetDate();

    // methods
    const targetSession = useMemo(() => {
        const focusIndex = sessions?.findIndex(s => s.date === TARGET_DATE);
        return focusIndex !== -1 ? sessions[focusIndex] : undefined;
    }, [sessions, selected]);

    const todaySession = useMemo(() => {
        const focusIndex = sessions?.findIndex(s => s.date === CURRENT_DATE);
        return focusIndex !== -1 ? sessions[focusIndex] : undefined;
    }, [sessions, selected]);

    const handleExSubmit = (exercise: Exercise) => {
        const sessionIndex = sessions?.findIndex(s => s.date === TARGET_DATE);

        if (sessionIndex >= 0) {
            const sessionList = [...sessions];
            sessionList[sessionIndex].exercises = [
                ...sessionList[sessionIndex].exercises,
                exercise,
            ];
            console.log(sessionList);
            setSessions(sessionList);
        } else {
            const newSession = new Session('', TARGET_DATE, '', [exercise]);
            setSessions([...sessions, newSession]);
            console.log(newSession);
        }
        setVisible(false);
    };

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
