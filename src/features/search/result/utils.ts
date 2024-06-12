export function parseSearchData(search: string | string[] | undefined) {
  return decodeURIComponent(search ? (Array.isArray(search) ? search[0] : search) : '');
}
