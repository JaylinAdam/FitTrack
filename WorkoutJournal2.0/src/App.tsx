import * as React from "react"
import { View, Text } from "react-native"
import {
    createStaticNavigation,
    NavigationContainer,
    useNavigation,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Settings } from "./navigation/screens/Settings"
import { Home } from "./navigation/screens/Home" 
import { Button } from "@react-navigation/elements";
import { Calendar } from "./navigation/screens/Calendar";
import { PaperProvider } from "react-native-paper"

const Stack = createNativeStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#00284e",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ title: "March 2025" }}
            />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Calendar" component={Calendar} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <RootStack />
            </NavigationContainer>
        </PaperProvider>
    )
}
