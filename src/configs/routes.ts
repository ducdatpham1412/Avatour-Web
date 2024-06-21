export const ADMIN_ROUTES = {
  suppliers: '/admin/suppliers',
  login: '/admin/login',
};

export const TOUR_ROUTES = {
  tourDetail: (tourId: number | undefined, timestamp: string | undefined) => {
    if (tourId) {
      return `/tour/${tourId}`;
    }
    const time = timestamp ? `?t=${timestamp}` : '';
    return `/tour/0${time}`;
  },
  createTour: '/tour',
};

export const PROFILE_ROUTES = {
  myProfile: '/profile',
};

export const SEARCH_ROUTES = {
  searchResult: (result: string) => `/search/${result}`,
};
