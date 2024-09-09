import React, { useState, useEffect } from "react";

export function makeTimeStringValue(currentTime) {
  let hours = currentTime.getHours();
  hours < 10 ? (hours = `0${hours}`) : (hours = `${hours}`);

  let minutes = currentTime.getMinutes();
  minutes < 10 ? (minutes = `0${minutes}`) : (minutes = `${minutes}`);

  let seconds = currentTime.getSeconds();
  seconds < 10 ? (seconds = `0${seconds}`) : (seconds = `${seconds}`);

  return `${hours}:${minutes}:${seconds}`;
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
