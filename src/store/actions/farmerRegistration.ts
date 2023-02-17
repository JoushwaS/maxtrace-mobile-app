import {
  ADD_PLOT,
  UPDATE_PLOT,
  REMOVE_PLOT,
  EDIT_PLOT,
  GET_ALL_PLOT,
  REMOVE_ALL_PLOT,
  FARMER_LOOKUP_INFO,
  ADD_FARMER,
  GET_FARMERS_LIST,
} from "../types";
const addPLot = (payload: any) => {
  return {
    type: ADD_PLOT,
    payload,
  };
};
const addFarmerAction = (payload: any) => {
  return {
    type: ADD_FARMER,
    payload,
  };
};
const updatePlotAction = (payload: any) => {
  return {
    type: UPDATE_PLOT,
    payload,
  };
};
const farmerLookUpInfoAction = (payload: any) => {
  return {
    type: FARMER_LOOKUP_INFO,
    payload,
  };
};
const getFarmersListAction = (payload: any) => {
  return {
    type: GET_FARMERS_LIST,
    payload,
  };
};
const deletePlot = (payload: any) => {
  return {
    type: REMOVE_PLOT,
    payload,
  };
};
const deleteAllPlots = (payload: any) => {
  return {
    type: REMOVE_ALL_PLOT,
    payload,
  };
};
export {
  addPLot,
  deletePlot,
  farmerLookUpInfoAction,
  deleteAllPlots,
  getFarmersListAction,
  updatePlotAction,
  addFarmerAction,
};
