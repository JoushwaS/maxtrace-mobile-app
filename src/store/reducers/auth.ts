import { DrawerContentScrollView } from "@react-navigation/drawer";
import { IActionType } from ".";
import {
  setLocalUserRegionList,
  setLocalUserRegion,
  getLocalUserRegion,
} from "../../helpers/commonHelper";
import {
  SET_USER_DATA,
  CLEAR_USER_DATA,
  SET_USER_REGION,
  SET_USER_REGIONS_LIST,
  GET_ZONES_LIST,
} from "../types";

export interface IUserState {
  profileImage?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
  fullname: string;
  password: string;
}
const initialState: any = {
  isAuth: false,
  user: {},
  region: {},
  regionLocal: getLocalUserRegion(),
  regionList: [],
  zoneList: [],
};

export default (state: any = initialState, action: IActionType): any => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        isAuth: true,
        user: {
          ...action.payload,
        },
      };
    case SET_USER_REGIONS_LIST:
      setLocalUserRegionList(action.payload);

      console.log(" set regions reducer called");
      return {
        ...state,
        regionList: action.payload,
      };
    case GET_ZONES_LIST:
      // setLocalUserRegionList(action.payload);

      console.log(" set zones reducer called");
      return {
        ...state,
        zoneList: action.payload,
      };
    case SET_USER_REGION:
      setLocalUserRegion(action.payload);
      return {
        ...state,
        region: action.payload,
      };

    case CLEAR_USER_DATA:
      return { isAuth: false, user: {} };
    default:
      return state;
  }
};
