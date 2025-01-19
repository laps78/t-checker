import { useState, useEffect } from "react";
import "./DigitalClock.css";

export function DigitalClock() {
  const actualTimeString = new Date().toLocaleTimeString();
  const [currentTimeString, setCurrentTimeString] = useState(actualTimeString);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActualTimeString = new Date().toLocaleTimeString();
      setCurrentTimeString(newActualTimeString);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTimeString]);

  return <div className="clock__string">&#8986;{currentTimeString}</div>;
}

export default { DigitalClock };
