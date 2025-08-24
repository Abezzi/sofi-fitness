import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "~/lib/useColorScheme";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function MainStack() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <>
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
    </>
  );
}
