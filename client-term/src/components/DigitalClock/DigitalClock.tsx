import { useState, useEffect } from "react";

export function makeTimeStringValue(currentTime: Date): string {
  return currentTime.toLocaleTimeString();
}

export function DigitalClock() {
  const actualTimeString = makeTimeStringValue(new Date());
  const [currentTimeString, setCurrentTimeString] = useState(actualTimeString);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActualTimeString = makeTimeStringValue(new Date());
      setCurrentTimeString(newActualTimeString);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return currentTimeString;
}

export default { DigitalClock, makeTimeStringValue };
