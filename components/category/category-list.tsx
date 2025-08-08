import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";

type Category = {
  id: string;
  name: string;
  color: string;
};

type CategoryListProps = {
  categories: Category[];
  onCategoryPress?: (category: Category) => void;
};

export function CategoryList({
  categories,
  onCategoryPress,
}: CategoryListProps) {
  const { isDarkColorScheme } = useColorScheme();
  const renderItem = ({ item }: { item: Category }) => (
    <Pressable
      onPress={() => onCategoryPress?.(item)}
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
            color: item.color,
            fontSize: 48,
            fontWeight: "500",
          }}
        >
          ■
        </Text>
        <Text
          style={{
            color: isDarkColorScheme ? "#fff" : "#000",
            fontSize: 48,
            fontWeight: "500",
          }}
        >
          {item.name}
        </Text>
      </Text>
    </Pressable>
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
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
