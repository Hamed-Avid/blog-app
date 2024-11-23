export function toLocalDateShort(date: string, locale = "fa-IR") {
  return new Date(date).toLocaleDateString(locale, {});
}
