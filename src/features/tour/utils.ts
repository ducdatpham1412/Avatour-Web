import dayjs from 'dayjs';

export function convertDecimalToTime(decimalHours: number) {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 100);

  // Create a dayjs object for today's date and set the hours and minutes
  const time = dayjs().hour(hours).minute(minutes);

  // Format the time as "H[h]mm"
  return time.format('H[h]mm');
}

export const formatCurrency = (number: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
