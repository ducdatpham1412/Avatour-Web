export function convertDuration(duration: number) {
  duration /= 1000;
  if (duration < 3600) {
    return `${Math.floor(duration / 60)}p`;
  }

  return `${Math.floor(duration / 3600)}h${Math.floor(duration / 60)}p`;
}

export function parseSearchData(search: string | string[] | undefined) {
  return decodeURIComponent(search ? (Array.isArray(search) ? search[0] : search) : '');
}
