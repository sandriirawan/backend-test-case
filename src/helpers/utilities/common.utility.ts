export function getBoolean(value: any): boolean {
  switch (value) {
    case true:
    case 'true':
    case 1:
    case '1':
    case 'on':
    case 'yes':
      return true;
    default:
      return false;
  }
}

export function getToken(headers: any): string | null {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export function isJson(item: any): boolean {
  item = typeof item !== 'string' ? JSON.stringify(item) : item;
  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }
  return typeof item === 'object' && item !== null;
}

export function isNumeric(n: any): boolean {
  return !isNaN(parseFloat(n)) && isFinite(n) && !Number.isNaN(n);
}
