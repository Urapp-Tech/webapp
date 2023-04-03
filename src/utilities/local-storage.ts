export function setItem<T = any>(key: string, value: T) {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
}

export function getItem<T = any>(key: string) {
  const stringifiedValue = localStorage.getItem(key);
  if (stringifiedValue) {
    return JSON.parse(stringifiedValue) as T;
  }
  return null;
}
