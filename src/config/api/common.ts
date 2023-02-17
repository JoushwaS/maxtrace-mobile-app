import { axiosInstance } from "./AxiosInstance";
import axios from "./http";
import { Endpoints } from "./index";

export const getLanguages = () => {
  return axios.get(Endpoints.GET_LANG);
};
export const getFarmerLookUp = () => {
  return axiosInstance.get(Endpoints.FARMER_LOOKUP);
};
export const getZonesList = () => {
  return axiosInstance.get(Endpoints.SHOW_ZONES);
};
