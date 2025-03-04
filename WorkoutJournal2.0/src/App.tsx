import * as React from "react"
import { View, Text } from "react-native"
import {
    createStaticNavigation,
    NavigationContainer,
    useNavigation,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Workouts } from "./navigation/screens/Workouts"
import { Home } from "./navigation/screens/Home" 
import { Button } from "@react-navigation/elements";
import { Calendar } from "./navigation/screens/Calendar";

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
            <Stack.Screen name="Workouts" component={Workouts} />
            <Stack.Screen name="Calendar" component={Calendar} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
    )
}
