const dayFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const monthFormat = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** 16 Feb 2026 */
export function formatDate(iso: string): string {
  return dayFormat.format(new Date(iso));
}

/** Feb 2026 */
export function formatMonth(iso: string): string {
  return monthFormat.format(new Date(iso));
}

/** Mar 2023 – Present */
export function formatRange(start: string, end: string | null): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : "Present"}`;
}

export function pad(index: number): string {
  return String(index + 1).padStart(2, "0");
}
