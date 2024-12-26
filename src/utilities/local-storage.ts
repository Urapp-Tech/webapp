type Key =
  | 'ADDRESS'
  | 'CART_ITEMS'
  | 'DEVICE_DATA'
  | 'ORDER_ITEM'
  | 'REGISTERED_CART'
  | 'SIGN_UP_DATA'
  | 'SYSTEM_CONFIG'
  | 'TENANT_CONFIG'
  | 'TENANT'
  | 'APPOINTMENT_BOOKINGS'
  | 'USER'
  | 'BRANCH'
  | 'IS_BRANCH_SINGLE'
  | 'LOCATION'
  | 'LAST_ACTIVITY';

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
