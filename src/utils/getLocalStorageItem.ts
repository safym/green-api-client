// Получить значение item с ключом key из LocalStorage
export function getLocalStorageItem (key: string) {
  return localStorage.getItem(key)
}
