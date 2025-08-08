import React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useLocalSearchParams } from "expo-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { LucideTrash } from "lucide-react-native";
import { useColorScheme } from "~/lib/useColorScheme";

export default function CategoryDetailScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center gap-5 p-6 bg-secondary/30">
      <Text>SANDIA: Category Details for ID: {id || "unknow"}</Text>

      <Card className="w-full max-w-sm p-6 rounded-2xl">
        <CardHeader className="items-center">
          <CardTitle className="pb-2 text-center">Category Details</CardTitle>
          <View className="flex-row">
            <CardDescription className="text-base font-semibold">
              here you can edit the category
            </CardDescription>
          </View>
        </CardHeader>
        <CardContent className="text-base font-semibold ">
          <Label nativeID="categoryName">Category</Label>
          <Input
            placeholder="Category Name..."
            aria-labelledby="categoryName"
            aria-errormessage="inputError"
          />

          <Label nativeID="categoryColor">Color</Label>
          <Input
            placeholder="Category Color..."
            aria-labelledby="categoryColor"
            aria-errormessage="inputError"
          />
        </CardContent>
        <CardFooter className="flex-col gap-3 pb-0">
          <View className="flex-row items-center overflow-hidden">
            <LucideTrash color="#FF0000" />
            <Text
              style={{
                color: "#FF0000",
                fontSize: 24,
                fontWeight: "500",
              }}
            >
              DELETE
            </Text>
          </View>
        </CardFooter>
      </Card>
    </View>
  );
}
