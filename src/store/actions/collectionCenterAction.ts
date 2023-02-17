import {
  ADD_COLLECTION_CENTER,
  EDIT_COLLECTION_CENTER,
  GET_COLLECTION_CENTERS,
} from "../types";
const addCollectionCenter = (payload: any) => {
  return {
    type: ADD_COLLECTION_CENTER,
    payload,
  };
};
const editCollectionCenter = (payload: any) => {
  return {
    type: EDIT_COLLECTION_CENTER,
    payload,
  };
};
const getCollectionCenterListAction = (payload: any) => {
  return {
    type: GET_COLLECTION_CENTERS,
    payload,
  };
};

export {
  addCollectionCenter,
  editCollectionCenter,
  getCollectionCenterListAction,
};
