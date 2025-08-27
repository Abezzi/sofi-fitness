import { useLocalSearchParams } from "expo-router";
import { ExerciseList } from "~/components/exercise/exercise-list";
import { Text } from "~/components/ui/text";
import { Exercise } from "~/db/schema";

export default function Screen() {
  const { id } = useLocalSearchParams() as { id: string };
  let exercisesTemp: Exercise[] = [
    {
      id: 1,
      name: "bicep curl",
      description: "description",
      categoryId: 1,
      exerciseTypeId: 2,
    },
  ];

  function handleExercisePress() {
    console.log("pressed exercise list");
  }

  return (
    <>
      <Text>category id: {id}</Text>
      <ExerciseList
        exercises={exercisesTemp}
        onExercisePress={handleExercisePress}
      />
    </>
  );
}
