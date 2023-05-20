// Сохранить item с ключом key, данными data в LocalStorage
export function setLocalStorageItem (key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}
