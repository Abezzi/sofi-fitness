import "~/global.css";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

import {
  DarkTheme,
  DefaultTheme,
  LocaleDirContext,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import { ActivityIndicator, Appearance, Platform, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { Suspense } from "react";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "~/drizzle/migrations";
import { Text } from "~/components/ui/text";
import {
  initializeDatabase,
  loadExerciseTypes,
  resetDatabase,
} from "~/db/logic";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import MainStack from "~/navigator/main-stack";
import { DATABASE_NAME, db, expoDb } from "~/db";

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
  loadExerciseTypes();
  const { success, error } = useMigrations(db, migrations);
  useDrizzleStudio(expoDb);

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
          <MainStack />
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

function noop() {}
