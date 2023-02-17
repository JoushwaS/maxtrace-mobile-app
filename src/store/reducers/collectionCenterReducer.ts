import {
  ADD_COLLECTION_CENTER,
  EDIT_COLLECTION_CENTER,
  GET_COLLECTION_CENTERS,
} from "../types";
import { IActionType } from ".";
export interface ICollectionCenterType {
  collectionCenterList: Array<Object>;
  collectionCenter: Object[];
  editCollectionCenter: Object;
}
const initialState: any = {
  collectionCenterList: [],
  collectionCenter: {},
  editCollectionCenter: {},
};
export default (
  state: ICollectionCenterType = initialState,
  action: IActionType
): any => {
  switch (action.type) {
    case ADD_COLLECTION_CENTER:
      return {
        ...state,
        collectionCenter: action.payload,
      };
    case EDIT_COLLECTION_CENTER:
      return {
        ...state,
        editCollectionCenter: action.payload,
      };
    case GET_COLLECTION_CENTERS:
      // updatePlot(state.plotListSaved, action.payload);
      // return;
      return {
        ...state,
        collectionCenterList: action.payload,
      };

    default:
      return state;
  }
};
