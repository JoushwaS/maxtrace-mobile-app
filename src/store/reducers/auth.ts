import { IActionType } from ".";
import { SET_USER_DATA, CLEAR_USER_DATA } from "../types";

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

    case CLEAR_USER_DATA:
      return { isAuth: false, user: {} };
    default:
      return state;
  }
};
