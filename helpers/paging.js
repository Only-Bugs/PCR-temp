export const PAGE_SIZE = 3;

export function chunk(arr, size = PAGE_SIZE) {
  const out = [];
  if (!Array.isArray(arr) || size <= 0) {
    return out;
  }
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}
