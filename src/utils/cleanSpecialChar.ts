// Очистить строку от спецсимволов
export function cleanSpecialChar (string: string) {
  return string.replace(/[^a-zа-яё0-9\s]/gi, '');
}