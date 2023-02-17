import { combineReducers } from "redux";
import auth from "./auth";
import common from "./common";
import farmerRegistration from "./farmerRegistration";
import collectionCenter from "./collectionCenterReducer";

//action type declaration
export interface IActionType {
  type: string;
  payload: any;
}

// combine all reducers
const rootReducer = combineReducers({
  auth,
  common,
  farmerRegistration,
  collectionCenter,
});

export default rootReducer;
