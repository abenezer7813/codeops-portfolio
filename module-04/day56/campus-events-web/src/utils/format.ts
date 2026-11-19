const TIME_ZONE = "Africa/Addis_Ababa";

export function formatDate(
  iso: string,
  style: "medium" | "long" = "medium",
): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    dateStyle: style,
    timeZone: TIME_ZONE,
  });
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  });
}