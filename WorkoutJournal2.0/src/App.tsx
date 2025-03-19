import React, { useState, useMemo } from 'react';
import { View, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Settings } from './navigation/screens/Settings';
import { Home } from './navigation/screens/Home';
import { Calendar } from './navigation/screens/Calendar';
import { AppProvider, ThemeProvider, useTheme } from './Context/';

const Stack = createNativeStackNavigator();

function RootStack() {
    const { theme, toggleTheme } = useTheme();
    const [enabled, setEnabled] = useState(false);

    const handleSwitch = () => {
        setEnabled(!enabled);
        toggleTheme();
    };

    const screenOptions = useMemo(
        () => ({
            headerStyle: {
                backgroundColor: theme.background.primary,
            },
            headerShadowVisible: false,
            headerTintColor: theme.text.primary,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            contentStyle: {
                backgroundColor: theme.background.primary,
            },
        }),
        [theme],
    );

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
            <Stack.Screen
                name="Home"
                component={Home}
                options={({ navigation }) => ({
                    title: 'March 2025',
                    headerRight: () => (
                        <View style={{ paddingRight: 16 }}>
                            {/* <Button onPress={() => navigation.navigate("Calendar")}>
                Calender
              </Button> */}
                            <Switch
                                value={enabled}
                                onValueChange={handleSwitch}
                            />
                        </View>
                    ),
                })}
            />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Calendar" component={Calendar} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AppProvider>
                <GestureHandlerRootView>
                    <NavigationContainer>
                        <RootStack />
                    </NavigationContainer>
                </GestureHandlerRootView>
            </AppProvider>
        </ThemeProvider>
    );
}
