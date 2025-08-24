import { Input } from "~/components/ui/input";
import { AlertCircleIcon, Save } from "lucide-react-native";
import { Label } from "~/components/ui/label";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { postCategory } from "~/db/queries/category.queries";

type Category = {
  id: number;
  name: string;
  color: string;
};

export function CategoryForm() {
  const [showAlert, setShowAlert] = useState(false);
  const [category, setCategory] = useState<Category>({
    id: 0,
    name: "",
    color: "",
  });

  const handleInputChange = (field: keyof Category, value: string) => {
    setCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!category.name || !category.color) {
      setShowAlert(true);
    }

    // POST category into db
    postCategory(category);
    console.log("submit");
    setShowAlert(false);

    return;
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
          <Pressable onPress={handleSubmit}>
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
          </Pressable>
        </CardFooter>
      </Card>
      {showAlert && (
        <View className="w-full max-w-xl gap-4">
          <Alert variant="destructive" icon={AlertCircleIcon}>
            <AlertTitle>Unable to create your category.</AlertTitle>
            <AlertDescription>
              Please verify the fields and try again.
            </AlertDescription>
            <View role="list" className="ml-0.5 pb-2 pl-6">
              <Text role="listitem" className="text-sm text-red-500">
                <Text className="web:pr-2">•</Text> Check name
              </Text>
              <Text role="listitem" className="text-sm text-red-500">
                <Text className="web:pr-2">•</Text> Ensure color field is not
                empty
              </Text>
            </View>
          </Alert>
        </View>
      )}
    </View>
  );
}
