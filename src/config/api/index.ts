// const BASE_URL: string = "http://13.214.69.14:8000/api/v1"; // QA
const BASE_URL: string = "http://13.214.69.14:5000/api/v1"; // DEV

const Endpoints = {
  // AUTHENTICATION
  LOGIN: "/mobile/auth/login",
  FORGET_PASSWORD: "/mobile/auth/forget-password",
  VERIFY_PIN: "/mobile/auth/reset-password-pin-verification",
  RESET_PASSWORD: "/mobile/auth/reset-password",

  // FARMER REGISTRATION
  REGISTER_FARMER_ONLINE: "/mobile/farmers",
  REGISTER_FARMER_OFFLINE: "/mobile/register-farmers",
  FARMER_LOOKUP: "/mobile/farmer-lookup?pagination=no&lookup=1", //get info for dropdown menu's
  GET_FARMERS_LIST: "/mobile/farmers", //get info for dropdown menu's

  // COLLECTION CENTER

  REGISTER_COLLECTION_CENTER: "/mobile/collection-centers",
  GET_COLLECTION_CENTER_LIST: "/mobile/collection-centers",

  //LANGUAGES
  GET_LANG: "/languages",
  SHOW_LANGUAGES: "/mobile/languages",
  SHOW_LANGUAGE: "/mobile/languages/",

  // ZONES
  SHOW_ZONES: "/mobile/zones",

  // REGIONS
  SHOW_REGION: "/mobile/regions",
};

export { Endpoints, BASE_URL };
