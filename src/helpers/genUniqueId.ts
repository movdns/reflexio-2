/**
 * Generates unique string (6 digits), ex: wvfdvy
 * @return string
 */
export function genUniqueId(): string {
  const randomStr = Math.random().toString(36).substring(2, 8); // start at index 2 to skip decimal point
  return `${randomStr}`;
}
