import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { CategoryList } from "~/components/category/category-list";
import { useRouter } from "expo-router";

export default function Screen() {
  const router = useRouter();

  //TODO: SQL queries

  const categories = [
    { id: "1", name: "Cardio", color: "#FFFF00" },
    { id: "2", name: "Back", color: "#FF00FF" },
    { id: "3", name: "Flexibility", color: "#00FFFF" },
    { id: "4", name: "Legs", color: "#F0FFAF" },
    { id: "5", name: "Forearm", color: "#F12F9F" },
    { id: "6", name: "Bicep", color: "#FFFFFF" },
    { id: "7", name: "Chest", color: "#FFFF5F" },
    { id: "8", name: "Tricep", color: "#FABFFF" },
    { id: "9", name: "Core", color: "#FFFFFF" },
    { id: "10", name: "Balance", color: "#FFCCFF" },
    { id: "11", name: "dr k", color: "#0FFFDA" },
    { id: "12", name: "dr k", color: "#FF0FF1" },
    { id: "13", name: "dr k", color: "#FFEEAA" },
  ];

  const handleCategoryPress = (category: {
    id: string;
    name: string;
    color: string;
  }) => {
    router.push(`/categories/${category.id}`);
  };

  return (
    <View>
      <Text>SANDIA category screen</Text>
      <Text>SANDIA here should have a list of categories</Text>
      <CategoryList
        categories={categories}
        onCategoryPress={handleCategoryPress}
      />
    </View>
  );
}
