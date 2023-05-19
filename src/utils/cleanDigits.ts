export function cleanDigits (string: string) {
  return string.replace(/[^0-9.]/g, "");
}
