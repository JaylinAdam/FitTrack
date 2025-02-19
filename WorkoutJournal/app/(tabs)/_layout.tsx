import { IconSymbol } from "@/app-example/components/ui/IconSymbol";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="(home)"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="house.fill" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="house.fill" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
