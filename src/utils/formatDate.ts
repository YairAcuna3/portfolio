// 7 September 2025
export function formatDate(date: string | Date, locale: string = "en-US") {
  const d = typeof date === "string" ? new Date(date) : date;

  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Sep 7, 2025, 02:30 PM
export function formatDateTime(date: string | Date, locale: string = "en-US") {
  const d = typeof date === "string" ? new Date(date) : date;

  return d.toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// 2025/09/06
export function formatDateOnly(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}
