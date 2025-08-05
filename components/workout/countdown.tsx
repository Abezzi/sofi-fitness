import Animated, {
  FadeInUp,
  FadeOutDown,
  LayoutAnimationConfig,
} from "react-native-reanimated";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

type CountdownPropsType = {
  time: number;
  text: string;
};

const Countdown = ({ time, text }: CountdownPropsType) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval); // Stop the interval when time reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Update every second (1000ms)

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    let percentOfTimeRemaining = (timeLeft / time) * 100;

    setProgress(percentOfTimeRemaining);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (seconds > 60) return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    return seconds;
  };

  return (
    <View>
      <LayoutAnimationConfig skipEntering>
        <Animated.View key={timeLeft} className="items-center">
          <Text className="text-9xl">{formatTime(timeLeft)}</Text>
        </Animated.View>
      </LayoutAnimationConfig>
      <Progress
        value={progress}
        indicatorClassName={
          timeLeft < 10
            ? "bg-red-500"
            : timeLeft < 60
              ? "bg-yellow-500"
              : "bg-green-500"
        }
      />

      <View className="items-center">
        <Text className="text-4xl">{text}</Text>
      </View>
      <Text>{progress}</Text>
    </View>
  );
};
export default Countdown;
