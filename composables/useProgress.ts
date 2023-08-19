export default function useProgress() {
  const progress = useState<number>("progress", () => 0);

  const setProgress = (value: number) => {
    progress.value = value;
  };

  return {
    progress,
    setProgress,
  };
}
