export const setTourOpenState = (tourId: string, value: string[][]) => {
  localStorage.setItem(`tour-open-state-${tourId}`, JSON.stringify(value));
};
export const getTourOpenState = (tourId: string) => {
  const storage = localStorage.getItem(`tour-open-state-${tourId}`);
  localStorage.removeItem(`tour-open-state-${tourId}`);
  return storage ? (JSON.parse(storage) as string[][]) : undefined;
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

/**
 * Phone order buddy
 */
export const setPhone = (phone: string) => {
  localStorage.setItem('phone', phone);
};
export const getPhone = () => localStorage.getItem('phone');

/**
 * Edit magazine
 */
export const setMagazine = (magazine: TypeMagazine) => {
  localStorage.setItem('magazine', JSON.stringify(magazine));
};
export const getMagazine = () => {
  const storage = localStorage.getItem('magazine');
  return storage ? (JSON.parse(storage) as TypeMagazine) : undefined;
};
export const deleteMagazine = () => {
  localStorage.removeItem('magazine');
};

/**
 * See list images
 */
type Album = {
  name: string;
  images: string[];
};

export const setAlbum = (album: Album) => {
  localStorage.setItem('album', JSON.stringify(album));
};
export const getAlbum = () => {
  const storage = localStorage.getItem('album');
  return storage ? (JSON.parse(storage) as Album) : undefined;
};
export const deleteAlbum = () => {
  localStorage.removeItem('album');
};
