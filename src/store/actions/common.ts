import {  SET_LANG } from "../types";

const setLang = (payload:Object) => {
  return {
    type: SET_LANG,
    payload,
  };
};
export {setLang}