import {
  deleteLocalUserInfo,
  setLocalUserRegion,
} from "../../helpers/commonHelper";
import {
  SET_USER_DATA,
  CLEAR_USER_DATA,
  SET_USER_REGION,
  SET_USER_REGIONS_LIST,
  GET_ZONES_LIST,
} from "../types";

const setUserData = (payload: any) => {
  return {
    type: SET_USER_DATA,
    payload,
  };
};
const setUserRegion = (payload: any) => {
  return {
    type: SET_USER_REGION,
    payload,
  };
};
const setUserRegionList = (payload: any) => {
  return {
    type: SET_USER_REGIONS_LIST,
    payload,
  };
};
const setZonesListAction = (payload: any) => {
  return {
    type: GET_ZONES_LIST,
    payload,
  };
};

const clearUserData = () => {
  deleteLocalUserInfo();
  return {
    type: CLEAR_USER_DATA,
  };
};

export {
  setUserData,
  clearUserData,
  setUserRegion,
  setUserRegionList,
  setZonesListAction,
};
