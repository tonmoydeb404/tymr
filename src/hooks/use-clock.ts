import { useEffect, useRef, useState } from "react";

const useClock = () => {
  const [time, setTime] = useState<string>(new Date().toISOString());
  const rafId = useRef<number | null>(null); // Store the rafId to cancel when necessary

  const updateClock = () => {
    const now = new Date();
    setTime(now.toISOString()); // Update state with current time
    rafId.current = requestAnimationFrame(updateClock); // Schedule the next update
  };

  useEffect(() => {
    rafId.current = requestAnimationFrame(updateClock); // Start the clock

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current); // Clean up and cancel when the component unmounts
      }
    };
  }, []);

  return time; // Return the current time
};

export default useClock;
