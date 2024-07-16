export const ADMIN_ROUTES = {
  suppliers: '/admin/suppliers',
  login: '/admin/login',
};

export const TOUR_ROUTES = {
  tourDetail: (tourId: TypeTour['id'], index?: number) => {
    if (tourId && index !== undefined) {
      return `/tour/${tourId}?index=${index}`;
    }
    if (tourId) {
      return `/tour/${tourId}`;
    }
    if (index !== undefined) {
      return `/tour/0?index=${index}`;
    }
    return `/tour/0`;
  },
  createTour: '/tour',
};

export const PROFILE_ROUTES = {
  myProfile: '/profile',
  editProfile: '/profile/edit',
  profileId: (userId: number) => `/profile/${userId}`,
};

export const SEARCH_ROUTES = {
  searchResult: (result: string) => `/search/${result}`,
};
