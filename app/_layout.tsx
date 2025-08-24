import "~/global.css";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useEffect, useState } from "react";
import { ActivityIndicator, Appearance, Platform, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { Suspense } from "react";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "~/drizzle/migrations"; // TODO: ??
import { Text } from "~/components/ui/text";
import { initializeDatabase, resetDatabase } from "~/db/logic";
import * as schema from "db/schema";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
export const DATABASE_NAME = "db.db";

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

function DatabaseInitializer() {
  // resetDatabase(); // DEBUG: resets db
  initializeDatabase();
  const expoDb = openDatabaseSync(DATABASE_NAME, {
    enableChangeListener: true,
  });
  const db = drizzle(expoDb, { schema });
  useDrizzleStudio(expoDb);
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      console.log("Migrations applied successfully");
    }
  }, [success]);

  if (error) {
    console.error("Migration error details:", error);
    return (
      <View>
        <Text>migration error: {JSON.stringify(error, null, 2)}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return null;
}

export default function RootLayout() {
  usePlatformSpecificSetup();
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <DatabaseInitializer />
          <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="category"
              options={{
                title: "Category",
                headerTitle: "Category",
                headerRight: () => <ThemeToggle />,
              }}
            />
            <Stack.Screen
              name="categories/[id]"
              options={{
                title: "Category Details",
                headerTitle: "Category Details",
                headerRight: () => <ThemeToggle />,
              }}
            />
          </Stack>
          <PortalHost />
        </ThemeProvider>
      </SQLiteProvider>
    </Suspense>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    // adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add("bg-background");
  }, []);
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
  }, []);
}

function noop() { }
