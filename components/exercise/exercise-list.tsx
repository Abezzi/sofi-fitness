import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import { Category, Exercise } from "~/db/schema";
import { Separator } from "../ui/separator";
import { ExercisListHeader } from "./exercise-list-header";
import { EllipsisVertical } from "lucide-react-native";

type ExerciseListProps = {
  exercises: Exercise[];
  onExercisePress?: (exercise: Exercise) => void;
  category: Category;
};

export function ExerciseList({
  exercises,
  onExercisePress,
  category,
}: ExerciseListProps) {
  const { isDarkColorScheme } = useColorScheme();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const renderItem = ({ item }: { item: Exercise }) => {
    const isSelected = item.id === selectedId;

    return (
      <Pressable
        onPress={() => {
          setSelectedId(item.id); // Update selected item
          onExercisePress?.(item); // Call the provided callback
        }}
        style={({ pressed }) => [
          styles.itemContainer,
          {
            backgroundColor: isDarkColorScheme
              ? isSelected
                ? "#444" // Highlight color for selected item (dark mode)
                : pressed
                  ? "#333"
                  : "#222"
              : isSelected
                ? "#ccc" // Highlight color for selected item (light mode)
                : pressed
                  ? "#ddd"
                  : "#fff",
            borderColor: isSelected
              ? isDarkColorScheme
                ? "#666" // Optional: distinct border for selected item
                : "#aaa"
              : "#ccc",
          },
        ]}
      >
        <View style={styles.textContainer}>
          <Text
            style={{
              color: isDarkColorScheme ? "#fff" : "#000",
              fontSize: 36,
              fontWeight: isSelected ? "bold" : "normal", // Optional: bold text for selected
            }}
          >
            {item.name}
          </Text>
          <EllipsisVertical />
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={exercises}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={ExercisListHeader(category)}
      ListHeaderComponentStyle={styles.listHeader}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  listHeader: {
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
