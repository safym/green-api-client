// Очистить строку от всех символов кроме цифр
export function cleanDigits (string: string) {
  return string.replace(/[^0-9.]/g, "");
}
