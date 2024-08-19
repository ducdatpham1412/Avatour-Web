import dayjs, { extend, locale } from 'dayjs';
import vi from 'dayjs/locale/vi';
import utc from 'dayjs/plugin/utc';

locale(vi);
extend(utc);

export const formatTourDuration = (
  days: number,
  options?: {
    mode: 'day-night' | 'day-night-short' | 'days';
  },
) => {
  const d = Math.round(days);
  const { mode = 'days' } = options ?? {};

  if (mode === 'days') {
    return `${d} ngày`;
  }

  return mode == 'day-night-short'
    ? d <= 1
      ? 'Trong ngày'
      : `${d}N${d - 1}D`
    : `${d} ngày${d - 1 < 1 ? ' ' : ` ${d - 1} đêm`}`;
};

export const formatTourPrice = (min_cost: number, max_cost: number) => {
  if (min_cost === 0 && max_cost === 0) {
    return 'Miễn phí';
  }
  return `Khoảng ${formatPrice(min_cost)} - ${formatPrice(max_cost)}đ / người`;
};

export const formatPrice = (value: number) => {
  return value.toLocaleString('en-EN');
};
// export const formatCurrency = (number: number) =>
//     new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);

export const formatDuration = (hours: number) => {
  if (hours < 1) {
    return `${hours * 60}p`;
  }
  const floor = Math.floor(hours);
  const minutes = (hours - floor) * 60;
  const m = minutes ? `${minutes}m` : '';
  return `${floor}h${m}`;
};

export const formatTourName = (tour: TypeTour) => {
  return tour.name || `${tour.schedule[0]?.[0].name} -> ${tour.schedule.at(-1)?.at(-1)?.name}`;
};

export const formatUTCTime = (time: dayjs.Dayjs) => {
  return time.utc().format();
};
