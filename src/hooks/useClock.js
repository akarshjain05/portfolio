import { useEffect, useState } from "react";

function format(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Live HH:MM clock, ticking once a minute (matches the status-bar clock
// you see in most code editors — no need for second-level precision).
export default function useClock() {
  const [time, setTime] = useState(() => format(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(format(new Date())), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return time;
}
