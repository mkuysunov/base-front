export const routes = {
  home: {
    path: "/",
    getPath: () => "/",
  },
  catalog: {
    path: "/catalog",
    getPath: () => "/catalog",
  },

  cart: {
    path: "/cart",
    getPath: () => "/cart",
  },
  cartShop: {
    path: "/cart/shop/:slug",
    getPath: (slug: string) => `/cart/shop/${slug}`,
  },
  favorites: {
    path: "/favorites",
    getPath: () => "/favorites",
  },
  notifications: {
    path: "/profile/notifications",
    getPath: () => "/profile/notifications",
  },

  notification: {
    path: "/profile/notifications/:id",
    getPath: (id: string) => `/profile/notifications/${id}`,
  },
  profile: {
    path: "/profile",
    getPath: () => "/profile",
  },
  checkout: {
    path: "/checkout/:shopSlug",
    getPath: (slug: string) => `/checkout/${slug}`,
  },
  orders: {
    path: "/orders",
    getPath: () => "/orders",
  },

  order: {
    path: "/orders/:id",
    getPath: (id: string) => `/orders/${id}`,
  },
  disputes: {
    path: "/disputes",
    getPath: () => "/disputes",
  },
  dispute: {
    path: "/disputes/:id",
    getPath: (id: string) => `/disputes/${id}`,
  },
  deliveryAddresses: {
    path: "/delivery-addresses",
    getPath: () => "/delivery-addresses",
  },
  myQr: {
    path: "/my-qr",
    getPath: () => "/my-qr",
  },

  category: {
    path: "/category/:categorySlug",
    getPath(slug: string | number = "", params: Record<string, string> = {}) {
      const searchParams = new URLSearchParams(
        params as Record<string, string>
      )?.toString();

      return `/category/${slug}${searchParams}`;
    },
  },
  search: {
    path: "/search",
    getPath(params: Record<string, string> = {}) {
      const searchParams = new URLSearchParams(
        params as Record<string, string>
      )?.toString();

      return `/search/?${searchParams}`;
    },
  },
  support: {
    path: "/support",
    getPath: () => "/support",
  },
  faq: {
    path: "/faq",
    getPath: () => "/faq",
  },
  product: {
    path: "/products/:slug",
    getPath(id: string) {
      return `/products/${id}`;
    },
  },
  shops: {
    path: "/shops",
    getPath: () => "/shops",
  },
  shop: {
    path: "/shops/:shopSlug",
    getPath: (slug: string) => `/shops/${slug}`,
  },
  disputeCreate: {
    path: "/dispute/new/:orderId",
    getPath: (orderId: string) => `/dispute/new/${orderId}`,
  },
  chat: {
    path: "/chat/:disputeId",
    getPath: (disputeId: string) => `/chat/${disputeId}`,
  },
};
