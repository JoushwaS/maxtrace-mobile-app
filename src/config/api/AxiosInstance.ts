import axios from "axios";
import { BASE_URL } from "./index";
import { store } from "../../store";
import { getLocalUserInfo } from "../../helpers/commonHelper";
import { createIconSetFromFontello } from "react-native-vector-icons";
var StoredState = store.getState();
console.log("get user info from local >>", StoredState.common);
let axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 30000,

  headers: {
    // "Content-Type": "application/json",
    Authorization:
      StoredState.auth.user &&
      `Bearer ${StoredState?.auth?.user?.access_token}`,
  },
});

const requestInterceptor = (config: any) => {
  if (!StoredState?.common?.isConnected) {
    throw new axios.Cancel("Unable to connect");
  }
  console.log("config here", config);

  // Do something before request is sent
  if (StoredState.auth.user && StoredState.auth.user.access_token) {
    let accessToken = StoredState.auth.user.access_token;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }

  if (StoredState.auth.user && StoredState.auth.user.company_id) {
    let companyID = StoredState.auth.user && StoredState.auth.user.company_id;
    config.headers["Company-key"] = companyID;
  }

  if (StoredState.auth.user && StoredState.auth.region.id) {
    let regionID = StoredState.auth.user && StoredState.auth.region.id;
    config.headers["Region-Key"] = regionID;
  }
  return config;
};

const responseInterceptorError = (error: any) => {
  console.log("src/utils/AxiosInstance.js:48", error);

  const originalRequest = error.config;

  if (!error && !error.response) {
    return error;
  }

  //403 means Token has expired
  // if (
  //   error.response &&
  //   error.response.status === 403 &&
  //   !originalRequest._retry
  // ) {
  //   return error;
  // } else {
  console.log("src/utils/AxiosInstance.js:61", error);
  return error;
};

axiosInstance.interceptors.request.use(requestInterceptor, (error) => error);

axiosInstance.interceptors.response.use((response) => {
  return response;
}, responseInterceptorError);

const axiosIntanceInit = (store = null, token = null) => {
  axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  axiosInstance.interceptors.request.use(requestInterceptor, (error) => error);

  axiosInstance.interceptors.response.use(
    (response) => {
      // Handle success respons

      console.log("success interceptor>>>", response);
      return response;
    },
    (error) => {
      responseInterceptorError(error);
      // Handle network errors here
      if (error.response === undefined) {
        // console.error("Network Error:", error);
      } else {
        // Handle other types of errors here

        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      }

      // Return a new error object so the calling code knows an error has occurred
      return Promise.reject(error);
    }
  );
};

export { axiosInstance, axiosIntanceInit };
