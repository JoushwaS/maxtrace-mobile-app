import axios from "axios";
import { BASE_URL } from "./index";
import { store } from "../../store";
import { getLocalUserInfo } from "../../helpers/commonHelper";
var StoredState = store.getState();
// console.log(
//   "get user info from local >>",
//   StoredState.common.userInfoLocal.company_id
// );
console.log("get region info from local >>", StoredState.auth.region);
// let HEADERS = {
//   "Content-Type": "application/json",
//   "Accept-Language": "en",
//   Device: "Mobile",
//   Authorization:
//     StoredState.auth.user && `Bearer ${StoredState?.auth?.user?.access_token}`,
//   "Company-key": StoredState.auth.user && StoredState?.auth?.user?.company_id,
//   "Region-Key": StoredState.auth.user && StoredState?.auth?.region?.id,
// };
// if (StoredState.auth.user.company_id && store.getState().user) {
//   HEADERS.Company-Key = StoredState.auth.user.company_id;
// }

// if (StoredState.auth.region.id && store.getState().user) {
//   HEADERS["Region-Key"] = StoredState.auth.region.id;
// }
let instance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en",
    Device: "Mobile",
    Authorization:
      StoredState.auth.user && `Bearer ${StoredState.auth.user.access_token}`,
    "Company-key": StoredState.auth.user && StoredState.auth.user.company_id, // : StoredState.common.userInfoLocal.company_id,
    "Region-Key": StoredState.auth.user && StoredState.auth?.region?.id,
  },
});
// const requestInterceptor = (config: any) => {
//   // if (!store.getState().network.internetConnected) {
//   //   throw new axios.Cancel("Unable to connect");
//   // }
//   console.log("auth state check", StoredState.auth);
//   // console.log(
//   //   "StoredState.auth.user.company_id>>>>>>>>>>>>",
//   //   StoredState.auth.user.regio
//   // );

//   // Do something before request is sent
//   if (store.getState().auth.user && store.getState().auth.user.accessToken) {
//     let accessToken = StoredState.auth.token;
//     let companyID = StoredState.auth.user.company_id;
//     let regionID = StoredState.auth.region.id;
//     if (StoredState.auth.user.access_token) {
//       // config.headers["Authorization"] =
//       //   StoredState.auth.user.access_token &&
//       //   `Bearer ${StoredState.auth.user.access_token}`;
//       // config.headers["Content-Type"] = "application/json";
//       // config.headers["Accept-Language"] = "en";
//       // config.headers["Device"] = "Mobile";
//       // // config.headers["Region-Key"] = 1;
//       // if (StoredState.auth.user && StoredState.auth.user.company_id) {
//       //   config.headers["Company-key"] = StoredState.auth.user.company_id;
//       // }
//       // if (StoredState.auth.user && StoredState.auth.region.id) {
//       //   // config.headers["Region-Key"] = StoredState.auth.region.id;
//       // }
//     }
//   }

//   return config;
// };

// instance.interceptors.request.use(requestInterceptor, (error: any) => error);

// instance.defaults.headers.get["Content-Type"] = "application/json";
instance.defaults.headers.post["Content-Type"] = "multipart/form-data";

export default instance;
