import * as React from "react";
import { View, Text } from "react-native";
import {
    createStaticNavigation,
    NavigationContainer,
    useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "@react-navigation/elements";
import { Settings } from "./navigation/screens/Settings";
import { Home } from "./navigation/screens/Home";

const Stack = createNativeStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#f4511e",
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
                options={{ title: "Overview" }}
            />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
    );
}
