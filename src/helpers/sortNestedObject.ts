/**
 * Deep sort of object properties
 */
const sortNestedObjectByField = (obj: any, field: string, toArray?: false) => {
  const sorted = Object.keys(obj).sort((a: any, b: any) => {
    return typeof obj[a].order === "undefined" &&
      typeof obj[b].order === "undefined"
      ? 0
      : typeof obj[a].order === "undefined"
      ? 1
      : typeof obj[b].order === "undefined"
      ? -1
      : obj[a].order - obj[b].order;
  });

  if (toArray) {
    return sorted.map((key) => {
      return obj[key];
    });
  }

  let sortedObj: { [key: string]: {} } = {};
  sorted.forEach((key: string) => {
    sortedObj[key] = obj[key];
  });

  return sortedObj;
};

export default sortNestedObjectByField;
