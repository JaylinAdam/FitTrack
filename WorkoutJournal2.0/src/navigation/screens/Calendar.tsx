// libraries
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// import { useNavigation } from '@react-navigation/native';
import { Calendar as CalComp } from 'react-native-calendars';

// context
import { useApp, Theme, useTheme } from '../../Context';

// components
import { ExerciseInputModal, Icon, ExerciseCard } from './components';

interface Day {
    // interface of data returned from calendar onPress
    dateString: string;
    day: number;
    month: number;
    timeStamp: Date;
    year: 2025;
}

export const Calendar = () => {
    // const navigation = useNavigation();
    const { theme } = useTheme();

    const styles = useMemo(() => createStyles(theme), [theme]);

    const {
        selected,
        setSelected,
        sessions,
        targetSession,
        CURRENT_DATE,
        setVisible,
    } = useApp();

    const formattedMarkedList = () => {
        const formatted: any = {
            [selected]: {
                selected: true,
                disableTouchEvent: true,
            },
        };
        sessions.forEach(s => {
            const focusMonth = s.date.split('-')[1];
            const currentMonth = CURRENT_DATE.split('-')[1];

            if (s.date.length > 0 && focusMonth === currentMonth) {
                formatted[s.date.toString()] = {
                    ...formatted[s.date.toString()],
                    marked: true,
                };
            }
        });
        return formatted;
    };

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                <View style={styles.container}>
                    <View style={styles.calendarWrapper}>
                        <CalComp
                            theme={{
                                backgroundColor: theme.background.secondary,
                                calendarBackground: theme.background.secondary,
                                textSectionTitleColor: theme.text.accent,
                                monthTextColor: theme.text.accent,
                                textMonthFontWeight: 500,
                                textMonthFontSize: 18,
                                selectedDayBackgroundColor: theme.text.accent,
                                selectedDayTextColor: theme.text.primary,
                                todayTextColor: theme.text.accent,
                                dayTextColor: theme.text.primary,
                                textDisabledColor: theme.text.tertiary,
                                textInactiveColor: theme.text.tertiary,
                            }}
                            current={CURRENT_DATE}
                            onDayPress={(day: Day) => {
                                setSelected(day.dateString);
                            }}
                            markedDates={{ ...formattedMarkedList() }}
                        />
                    </View>
                </View>
                <View style={styles.notesWrapper}>
                    {targetSession?.exercises.map((e, index) => {
                        const key = `${e.name}1`;
                        return (
                            <ExerciseCard
                                key={key}
                                name={e.name}
                                info={e.info}
                                sets={e.sets}
                                reps={e.reps}
                            />
                        );
                    })}
                    <Icon
                        antIconName="plus"
                        bgColor={theme.button.add}
                        style={styles.addIcon}
                        onPress={() => setVisible(true)}
                    />
                </View>
                <View>
                    <View style={[StyleSheet.absoluteFillObject]}>
                        <ExerciseInputModal />
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        scrollView: { padding: 10 },
        container: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
        },
        calendarWrapper: {
            width: '100%',
            borderRadius: 15,
            overflow: 'hidden',
            boxShadow: '0px 0px 3px #a3a3a3',
            paddingBottom: 10,
            marginBottom: 3,
            backgroundColor: theme.background.secondary,
        },
        notesWrapper: {
            marginLeft: 58,
            alignItems: 'baseline',
        },
        addIcon: { marginTop: 10 },
        note: {
            borderRadius: 10,
            marginTop: 10,
            boxShadow: '0px 0px 3px #a3a3a3',
        },
        title: {
            fontSize: 20,
            color: theme.text.primary,
        },
        desc: {
            fontSize: 16,
            color: theme.text.secondary,
        },
    });
