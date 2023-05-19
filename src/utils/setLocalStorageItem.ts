export function setLocalStorageItem (key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}
