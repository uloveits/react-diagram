export function Guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
}

export function getFromLS<T>(key: string): T | null {
  if (window.localStorage) {
    try {
      return JSON.parse(window.localStorage.getItem(key) || '');
    } catch (e) {
      // Ignore  
    }
  }
  return null;
}

export function saveToLS<T>(key: string, value: T | null | undefined) {
  if (window.localStorage) {
    if (value === null || value === undefined) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }
}

export function delFromLS(key: string) {
  window.localStorage.removeItem(key);
}
