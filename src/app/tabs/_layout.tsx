import { Tabs } from "expo-router";


export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home"
                }}
            />

            <Tabs.Screen
                name="stock"
                options={{
                    title: "Stock"
                }}
            />

            <Tabs.Screen
                name="pautang"
                options={{
                    title: "Pautang"
                }}
            />

            <Tabs.Screen
                name="sourcing"
                options={{
                    title: "Sourcing"
                }}
            />
        </Tabs>
    )
}