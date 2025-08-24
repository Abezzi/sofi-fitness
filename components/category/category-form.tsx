import { Input } from "~/components/ui/input";
import { Save } from "lucide-react-native";
import { Label } from "~/components/ui/label";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

type Category = {
  id: string;
  name: string;
  color: string;
};

export function CategoryForm() {
  const [category, setCategory] = useState<Category>({
    id: "",
    name: "name",
    color: "",
  });

  const handleInputChange = (field: keyof Category, value: string) => {
    setCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!category.name || !category.color) return;
  };

  return (
    <View className="flex-1 items-center gap-5 p-6 bg-secondary/30">
      <Card className="w-full max-w-sm p-6 rounded-2xl">
        <CardHeader className="items-center">
          <CardTitle className="pb-2 text-center">New Category</CardTitle>
          <View className="flex-row">
            <CardDescription className="text-base font-semibold">
              here you can create a new category
            </CardDescription>
          </View>
        </CardHeader>
        <CardContent className="text-base font-semibold ">
          <Label nativeID="categoryName">Category</Label>
          <Input
            placeholder="Category Name..."
            aria-labelledby="categoryName"
            aria-errormessage="inputError"
            value={category.name}
            onChangeText={(categoryName) =>
              handleInputChange("name", categoryName)
            }
          />

          <Label nativeID="categoryColor">Color</Label>
          <Input
            placeholder="Category Color..."
            aria-labelledby="categoryColor"
            aria-errormessage="inputError"
            value={category.color}
            onChangeText={(categoryColor) =>
              handleInputChange("color", categoryColor)
            }
          />
        </CardContent>
        <CardFooter className="flex-col gap-3 pb-0">
          <View className="flex-row items-center overflow-hidden">
            <Save color="#FF0000" />
            <Text
              style={{
                color: "#FF0000",
                fontSize: 24,
                fontWeight: "500",
              }}
            >
              CREATE
            </Text>
          </View>
        </CardFooter>
      </Card>
      <Text>{category.name}</Text>
      <Text>{category.color}</Text>
    </View>
  );
}
