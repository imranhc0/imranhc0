"use client";

import { useSyncExternalStore } from "react";

const format = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Dhaka",
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

const getSnapshot = () => format.format(new Date());
const getServerSnapshot = () => null;

/** Current time in Dhaka. Renders "--:--" in the static HTML and fills in on the client. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className="t-meta whitespace-nowrap">
      Dhaka <time className="text-ink">{time ?? "--:--"}</time> · UTC+6
    </span>
  );
}
