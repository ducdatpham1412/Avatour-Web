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

export const ORDER_ROUTES = {
  buddy: (buddyId: number | string) => `/order/buddy/${buddyId}`,
  product: (productId: string) => `/order/product/${productId}`,
};

export const MAGAZINE_ROUTES = {
  createMagazine: '/magazine',
  magazineDetail: (magazineId: string) => `/magazine/${magazineId}`,
};

export const ALBUM_ROUTES = {
  album: '/album',
};

export const PROJECT_ROUTES = {
  list: '/project',
  projectDetail: (id: string) => `/project/${id}`,
  create: '/project/create',
};

export const POST_ROUTES = {
  postId: (postId: string) => `/project/post/${postId}`,
  createPost: '/project/post',
};

export const TOPIC_ROUTES = {
  topicId: (id: string) => `/project/topic/${id}`,
  createTopic: '/project/topic',
};
