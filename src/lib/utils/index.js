export const chunkArray = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export const filterDuplicates = (array, key, lookup = new Set()) =>
  array.filter((obj) => !lookup.has(obj[key]) && lookup.add(obj[key]));
