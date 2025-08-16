// TODO: Fix this to ensure that the progress value loaded from localstorage propagates everywhere.
export default function useProgress() {
  const progress = useState<number>("progress", () => 0);

  if (process.client) {
    const stored = localStorage.getItem("progress");

    if (stored !== null) {
      progress.value = parseFloat(stored);
    }

    // Watch for changes and save to localStorage
    watch(progress, (newValue) => {
      localStorage.setItem("progress", newValue.toString());
    });
  }

  const setProgress = (value: number) => {
    progress.value = value;
  };

  return {
    progress: readonly(progress),
    setProgress,
  };
}
