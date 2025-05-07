const ENDPOINTS = {
  USERS: "/user",
  LOGIN: "/user/login",
  FORGET_PASSWORD: "/user/forget-password",
  VERIFY_OTP: "/user/verify-otp",
  CHANGE_PASSWORD: "/user/change-password",
  UPDATE: "/user/",
  DELETE: "/user/",
  GOOGLE_SIGNUP: "/user/google",
  GOOGLE_OAUTH: "/user/google/callback",
  CATEGORY: '/categories/all-categories',
  SUBCATEGORY :'/categories/',
  PRODUCTS :'/categories/',
  CAROUSAL:'/product/get-carousel',
  WISHLIST:'/wishlist',
  WISHLISTGET:'/wishlist/get-wishlist',
  WISHLISTPOST:'/wishlist/create',
  WISHLISTDELETE:'/wishlist/wishlist-delete',
  COLLECTION:'/product/get-products'
};

export default ENDPOINTS;
