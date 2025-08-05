import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Appearance, Platform } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import {
  BicepsFlexed,
  Dumbbell,
  LucideCalendar,
  LucideHome,
} from "lucide-react-native";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  android: useSetAndroidNavigationBar,
  default: noop,
});

export default function RootLayout() {
  usePlatformSpecificSetup();
  const { isDarkColorScheme } = useColorScheme();

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Tabs
        screenOptions={{
          headerTitle: "Sofi Fitness",
          headerRight: () => <ThemeToggle />,
          tabBarActiveTintColor: isDarkColorScheme ? "#fff" : "#000",
          tabBarInactiveTintColor: isDarkColorScheme ? "#888" : "#666",
        }}
      >
        <Tabs.Screen
          name="(tabs)/index"
          options={{
            title: "Home",
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <LucideHome size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/exercise"
          options={{
            title: "Exercises",
            tabBarLabel: "Exercises",
            tabBarIcon: ({ color, size }) => (
              <Dumbbell size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/workout"
          options={{
            title: "Workout",
            tabBarLabel: "Workout",
            tabBarIcon: ({ color, size }) => (
              <BicepsFlexed size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/calendar"
          options={{
            title: "Calendar",
            tabBarLabel: "Calendar",
            tabBarIcon: ({ color, size }) => (
              <LucideCalendar size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      <PortalHost />
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add("bg-background");
  }, []);
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
  }, []);
}

function noop() {}
