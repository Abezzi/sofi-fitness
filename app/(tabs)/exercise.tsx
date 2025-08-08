import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { router } from "expo-router";

export default function Screen() {
  const handleGoToCategory = () => {
    router.navigate("/category");
  };

  return (
    <View>
      <Text>exercise</Text>
      <Button onPress={handleGoToCategory}>
        <Text>go to category</Text>
      </Button>
    </View>
  );
}
