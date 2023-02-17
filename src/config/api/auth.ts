import axios from "./http";
import { Endpoints } from "./index";

export const loginUser = (body: any) => {
  return axios.post(Endpoints.LOGIN, body);
};

export const forgotPassword = (body: any) => {
  return axios.post(Endpoints.FORGET_PASSWORD, body);
};

export const verifyPin = (body: any) => {
  return axios.post(Endpoints.VERIFY_PIN, body);
};

export const setNewPassword = (body: any) => {
  return axios.post(Endpoints.RESET_PASSWORD, body);
};
