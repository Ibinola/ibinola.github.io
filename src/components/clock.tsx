import React from "react";
import { memo, useEffect, useState } from "react";

function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char: string) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function Clock() {
  const [date, setDate] = useState(
    new Date().toLocaleTimeString("en-US", {
      timeZone: "Africa/Lagos",
      hourCycle: "h12",
    }),
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const refreshClock = () =>
      setDate(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Africa/Lagos",
          hourCycle: "h12",
        }),
      );

    const timerId = setInterval(refreshClock, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <span className="clock">
      {mounted ? date : "00:00:00"}{" "}
      <span aria-hidden className="select-none">
        ·
      </span>{" "}
      {getFlagEmoji("NG")} Lagos, Nigeria
    </span>
  );
}
export default memo(Clock);
