type Key =
  | 'ORDER_ITEM'
  | 'USER'
  | 'REGISTERED_CART'
  | 'CART_ITEMS'
  | 'DEVICE_DATA'
  | 'ADDRESS'
  | 'SIGN_UP_DATA'
  | 'TENANT_CONFIG'
  | 'TENANT';

function addKeyPrefix(key: string) {
  const prefix = 'WEB_APP';
  return `${prefix}_${key}`;
}

export function clear() {
  localStorage.clear();
}

export function getItem<T>(key: Key): T | null {
  const newKey = addKeyPrefix(key);
  try {
    const stringifiedJson = localStorage.getItem(newKey);
    if (stringifiedJson) {
      return JSON.parse(stringifiedJson);
    }
    return null;
  } catch {
    localStorage.removeItem(newKey);
    return null;
  }
}

export function removeItem(key: Key) {
  const newKey = addKeyPrefix(key);
  localStorage.removeItem(newKey);
}

export function setItem<T>(key: Key, value: T) {
  const newKey = addKeyPrefix(key);
  const stringifiedJson = JSON.stringify(value);
  localStorage.setItem(newKey, stringifiedJson);
}
