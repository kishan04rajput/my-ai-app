import { FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ 
          headerShown: false, 
          title: "ASL",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="rupee-sign" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
