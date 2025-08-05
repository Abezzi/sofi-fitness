import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { View } from "react-native";
import Animated, {
  FadeInUp,
  FadeOutDown,
  LayoutAnimationConfig,
} from "react-native-reanimated";
import { Progress } from "~/components/ui/progress";
import { Text } from "~/components/ui/text";
import Countdown from "~/components/workout/countdown";

export default function Screen() {
  const [progress, setProgress] = React.useState(0);

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }

  return (
    <>
      <View className="flex-row items-center overflow-hidden p-2">
        <View className="relative h-8 flex-1">
          <Progress
            value={progress}
            className="h-8 flex-1"
            indicatorClassName="bg-purple-500"
          />
          <LayoutAnimationConfig skipEntering>
            <Animated.View
              key={progress}
              entering={FadeInUp}
              exiting={FadeOutDown}
              className="absolute inset-0 items-center justify-center"
            >
              <Text className="text-lg font-bold outline dark:text-white text-gray">
                {progress}%
              </Text>
            </Animated.View>
          </LayoutAnimationConfig>
        </View>
      </View>
      {/*DEBUG:*/}
      <Button onPress={updateProgressValue}>
        <Text>TEST total progress</Text>
      </Button>
      <Countdown time={120} text="texto super largo para ver si cae" />
    </>
  );
}
