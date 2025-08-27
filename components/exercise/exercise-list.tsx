import React from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import { Exercise } from "~/db/schema";

type ExerciseListProps = {
  exercises: Exercise[];
  onExercisePress?: (exercise: Exercise) => void;
};

export function ExerciseList({
  exercises,
  onExercisePress,
}: ExerciseListProps) {
  const { isDarkColorScheme } = useColorScheme();
  const renderItem = ({ item }: { item: Exercise }) => (
    <Pressable
      onPress={() => onExercisePress?.(item)}
      style={({ pressed }) => [
        styles.itemContainer,
        {
          backgroundColor: isDarkColorScheme
            ? pressed
              ? "#333"
              : "#222"
            : pressed
              ? "#ddd"
              : "#fff",
        },
      ]}
    >
      <Text>
        <Text
          style={{
            color: isDarkColorScheme ? "#fff" : "#000",
            fontSize: 36,
          }}
        >
          {item.name}
        </Text>
      </Text>
    </Pressable>
  );

  return (
    <FlatList
      data={exercises}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
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
});
