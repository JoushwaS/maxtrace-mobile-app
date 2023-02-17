import { IActionType } from ".";
import { setLocalUserInfo, getLocalUserInfo } from "../../helpers/commonHelper";
import { SET_LANGUAGE, SET_IS_CONNECTED, SET_USER_INFO_LOCAL } from "../types";

export interface ICommonType {
  language: string;
  isConnected: boolean;
  userInfoLocal: Object;
}
const initialState: ICommonType = {
  language: "",
  isConnected: false,
  userInfoLocal: getLocalUserInfo(),
};

export default (
  state: ICommonType = initialState,
  action: IActionType
): any => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        language: action.payload,
      };
    case SET_IS_CONNECTED:
      return {
        isConnected: action.payload,
      };
    case SET_USER_INFO_LOCAL:
      console.log("calling set local save user info");
      setLocalUserInfo(action.payload);

      return {
        userInfoLocal: action.payload,
      };

    default:
      return state;
  }
};
