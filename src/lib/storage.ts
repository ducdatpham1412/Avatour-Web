export const setTourOpenState = (tourId: string, value: string[][]) => {
  localStorage.setItem(`tour-open-state-${tourId}`, JSON.stringify(value));
};
export const getTourOpenState = (tourId: string) => {
  const storage = localStorage.getItem(`tour-open-state-${tourId}`);
  return storage ? (JSON.parse(storage) as string[][]) : undefined;
};
export const removeTourOpenState = (tourId: string) => {
  localStorage.removeItem(`tour-open-state-${tourId}`);
};

/**
 * Tour crete: Edit tour
 */
export const setTourCreate = (tour: TypeTour) => {
  localStorage.setItem('tour-create', JSON.stringify(tour));
};
export const getTourCreate = () => {
  const storage = localStorage.getItem('tour-create');
  return storage ? (JSON.parse(storage) as TypeTour) : undefined;
};
export const removeTourCreate = () => {
  localStorage.removeItem('tour-create');
};
