type Key =
  | 'ORDER_ITEM'
  | 'USER'
  | 'REGISTERED_CART'
  | 'CART_ITEMS'
  | 'DEVICE_DATA'
  | 'ADDRESS'
  | 'SIGN_UP_DATA'
  | 'TENANT_CONFIG';

export function setItem<T = any>(key: Key, value: T): void {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
}

export function getItem<T = any>(key: Key): T | null {
  const stringifiedValue = localStorage.getItem(key);
  if (stringifiedValue) {
    try {
      return JSON.parse(stringifiedValue) as T;
    } catch (error) {
      localStorage.removeItem(key);
      return null;
    }
  }
  return null;
}

export function removeItem(key: Key): void {
  localStorage.removeItem(key);
}

export function clear(): void {
  localStorage.clear();
}
