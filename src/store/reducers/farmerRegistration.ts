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
import { IActionType } from ".";

import {
  addPlotToList,
  deletePlotFromPlotList,
  updatePlot,
} from "../../utils/index";
// import { updatePlotAction } from "../actions";

export interface IFarmerRegistrationType {
  plotListSaved: Array<Object>;
  farmerLookUpInfo: Object[];
  farmersList: Object[];
}
const initialState: any = {
  plotListSaved: [],
  farmersList: [],
  farmerLookUpInfo: {},
  addFarmer: {},
};

export default (
  state: IFarmerRegistrationType = initialState,
  action: IActionType
): any => {
  switch (action.type) {
    case ADD_FARMER:
      return {
        ...state,
        addFarmer: action.payload,
      };
    case GET_FARMERS_LIST:
      return {
        ...state,
        farmersList: action.payload,
      };
    case ADD_PLOT:
      return {
        ...state,
        plotListSaved: addPlotToList(state.plotListSaved, action.payload),
      };
    case UPDATE_PLOT:
      // updatePlot(state.plotListSaved, action.payload);
      // return;
      return {
        ...state,
        plotListSaved: updatePlot(state.plotListSaved, action.payload),
      };
    case FARMER_LOOKUP_INFO:
      return {
        ...state,
        farmerLookUpInfo: action.payload,
      };

    case REMOVE_PLOT:
      return {
        plotListSaved: deletePlotFromPlotList(
          state.plotListSaved,
          action.payload
        ),
      };
    case REMOVE_ALL_PLOT:
      return {
        plotListSaved: action.payload,
      };
    default:
      return state;
  }
};
