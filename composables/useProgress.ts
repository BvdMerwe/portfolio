import { useState } from "#app/composables/state";

const useProgress = () => {
  const progress = useState<number>("progress", () => 0);

  const setProgress = (value: number) => {
    progress.value = value;
  };

  return {
    progress,
    setProgress,
  };
};
export default useProgress;
