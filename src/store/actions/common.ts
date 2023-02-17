import { SET_LANGUAGE, SET_IS_CONNECTED, SET_USER_INFO_LOCAL } from "../types";

const setLanguage = (payload: any) => {
  return {
    type: SET_LANGUAGE,
    payload,
  };
};
const setIsConnected = (payload: any) => {
  return {
    type: SET_IS_CONNECTED,
    payload,
  };
};
const setUserInfoLocal = (payload: any) => {
  return {
    type: SET_USER_INFO_LOCAL,
    payload,
  };
};

export { setLanguage, setIsConnected, setUserInfoLocal };
