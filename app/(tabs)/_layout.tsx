import { Tabs } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";
import {
  BicepsFlexed,
  Dumbbell,
  LucideCalendar,
  LucideHome,
} from "lucide-react-native";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function TabsLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // headerTitle: "Sofi Fitness",
        headerRight: () => <ThemeToggle />,
        tabBarActiveTintColor: isDarkColorScheme ? "#fff" : "#000",
        tabBarInactiveTintColor: isDarkColorScheme ? "#888" : "#666",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "Sofi Fitness",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <LucideHome size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercise"
        options={{
          title: "Exercises",
          headerTitle: "Exercises",
          tabBarLabel: "Exercises",
          tabBarIcon: ({ color, size }) => (
            <Dumbbell size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: "Workout",
          headerTitle: "Workout",
          tabBarLabel: "Workout",
          tabBarIcon: ({ color, size }) => (
            <BicepsFlexed size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          headerTitle: "Calendar",
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <LucideCalendar size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
