import { useEffect, useRef, useState } from "react";

const useTimer = (startTime: string | undefined) => {
  const [elapsedTime, setElapsedTime] = useState<string>("00:00:00");
  const startRef = useRef<number | null>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (startTime) {
      startRef.current = new Date(startTime).getTime();
    } else {
      setElapsedTime("00:00:00");
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      return;
    }

    const updateTimer = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startRef.current!;
      const hours = Math.floor(elapsed / (1000 * 60 * 60));
      const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
      const formattedTime = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      setElapsedTime(formattedTime);
    };

    intervalId.current = setInterval(updateTimer, 1000); // Update every second

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current); // Cleanup on unmount or startTime change
      }
    };
  }, [startTime]);

  return elapsedTime;
};

export default useTimer;
