import axios from "./http";
import { Endpoints } from "./index";

export const loginUser = (body: any) => {
  return axios.post(Endpoints.LOGIN, body);
};
