type Key =
  | 'ORDER_ITEM'
  | 'USER'
  | 'REGISTERED_CART'
  | 'CART_ITEMS'
  | 'DEVICE_DATA'
  | 'ADDRESS'
  | 'SIGN_UP_DATA';

export function setItem<T = any>(key: Key, value: T) {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
}

export function getItem<T = any>(key: Key) {
  const stringifiedValue = localStorage.getItem(key);
  if (stringifiedValue) {
    return JSON.parse(stringifiedValue) as T;
  }
  return null;
}

export function removeItem(key: Key) {
  localStorage.removeItem(key);
}
