import { Endpoints } from "./index";
import { axiosInstance } from "./AxiosInstance";
import http from "./http";
import { objectToFormData, showToast } from "../../utils";
import Navigation from "../../navigation/root";
import { SCREENS } from "../constants";

export const addCollectionCenter = async (body: any, headers: Object) => {
  let formData = new FormData();
  const newCollectionFormData = objectToFormData(body);
  formData.append("facility_id", body?.facility_id);
  formData.append("facility_name", body?.facility_name);
  formData.append("manager_name", body?.manager_name);
  formData.append("mobile_number", body?.mobile_number);
  formData.append("address", body?.address);
  formData.append("region_id", body?.region_id);
  formData.append("zone_id", body?.zone_id);
  if (body?.image) {
    const { uri, type, fileName } = body?.image;
    console.log("image >>>>", { uri, mimeType: type, originalName: fileName });

    formData.append("image", { uri, type, name: fileName });
  }

  console.log("final form data collection new", newCollectionFormData);
  //   return;

  await axiosInstance
    .post(Endpoints.REGISTER_COLLECTION_CENTER, formData, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("here jousha", res);
      if (res?.data?.code == 201) {
        showToast({
          type: "success",
          text: res?.data?.message,
        });
        //  dispatch(deleteAllPlots([]));
        Navigation.navigate(SCREENS.REGISTER);

        return res;
      } else if (!res?.response?.data.status) {
        console.log("error collection 1", res);
        showToast({
          type: "error",
          text: res?.response?.data?.message
            ? res?.response?.data?.message
            : res?.response?.data?.error?.messages[0],
        });
        return res.data;
      } else {
        console.log("here");
        showToast({
          type: "success",
          text: res?.data?.message,
        });
        //  dispatch(deleteAllPlots([]));
        Navigation.navigate(SCREENS.REGISTER);

        return res.data;
      }
    })
    .catch((err) => {
      console.log("error creating collection center", err);
      showToast({
        type: "error",
        text: "Collection Center Registration Failed!",
      });
    });
};
export const getCollectionCentersList = async () => {
  return await axiosInstance
    .get(Endpoints.GET_COLLECTION_CENTER_LIST)
    .then((res) => {
      console.log("collection list", res.data.data);

      return res;
    })
    .catch((err) => {
      console.log("err", err);
      return err;
    });
  // return response;
};
