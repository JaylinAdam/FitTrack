import React, { useMemo } from 'react';
import { Button, Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, View, ScrollView } from 'react-native';
import { useApp, Theme, useTheme } from '../../Context';
import Right from '../../assets/right.svg';

// page variables
const { width } = Dimensions.get('window');
const GAP = 8;
const CARD_WIDTH = (width - GAP * 3) / 2; // Subtract gap and divide by 2

export function Home() {
    // NAVIGATION
    const navigation = useNavigation();
    // CONTEXTS
    const { theme, toggleTheme } = useTheme();
    const { sessions, todaySession } = useApp();
    // STYLE
    const styles = useMemo(() => createStyles(theme), [theme]);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <View style={styles.headerSpace}>
                        <Text style={styles.mainHead}>
                            Sessions
                            <Right height={20} width={20} />
                        </Text>
                    </View>
                    <View style={styles.contentSpace}>
                        <Text style={styles.miniHead}>March</Text>
                        <Text style={styles.count}>{sessions.length}</Text>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.headerSpace}>
                        <Text style={styles.mainHead}>
                            Exercises
                            <Right height={20} width={20} />
                        </Text>
                    </View>
                    <View style={styles.contentSpace}>
                        <Text style={styles.miniHead}>Today</Text>
                        <Text style={styles.count}>
                            {todaySession?.exercises.length ?? 0}
                        </Text>
                    </View>
                </View>

                <Button onPress={() => navigation.navigate('Settings')}>
                    Go to Settings
                </Button>
                <Button onPress={() => navigation.navigate('Calendar')}>
                    Go to Calendar
                </Button>
            </View>
        </ScrollView>
    );
}

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            // justifyContent: "center",
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            padding: GAP, // Ensures even padding around edges
        },
        mainHead: {
            fontSize: 20,
            fontWeight: 500,
            color: theme.text.primary,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        headerSpace: {
            display: 'flex',
            borderBottomWidth: 0.5,
            borderStyle: 'solid',
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 6,
            paddingBottom: 6,
            borderColor: theme.background.tertiary,
        },
        contentSpace: {
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 6,
            paddingBottom: 6,
        },
        miniHead: {
            fontSize: 12,
            fontWeight: 300,
            color: theme.text.primary,
        },
        count: {
            fontSize: 30,
            fontWeight: 500,
            color: theme.text.accent,
            marginTop: -3,
        },
        cardContainer: {
            width: CARD_WIDTH, // Adjusted width accounting for the gap
            backgroundColor: theme.background.secondary,
            borderRadius: 10,
        },
    });
