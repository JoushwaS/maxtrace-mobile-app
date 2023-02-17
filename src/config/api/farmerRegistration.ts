import { Endpoints } from "./index";
import { axiosInstance } from "./AxiosInstance";
import { objectToFormData, showToast } from "../../utils";
import Navigation from "../../navigation/root";
import { SCREENS } from "../constants";
import { deleteAllPlots } from "../../store/actions";

export const addFarmerOnline = async (
  body: any,
  headers: Object,
  dispatch: any
) => {
  const bodyData = objectToFormData(body);
  console.log("object data >>>", body);
  console.log("form data >>>>>>>>>>>>>>>", bodyData);
  let formData = new FormData();
  formData.append("company_id", body?.company_id);
  formData.append("farmer_type_id", body?.farmer_type_id);
  formData.append("gender", body?.gender);
  formData.append("email", body?.email);
  formData.append("first_name", body?.first_name);
  formData.append("last_name", body?.last_name);
  formData.append("date_of_birth", body?.date_of_birth);
  formData.append("country_id", body?.country_id);
  formData.append("region_id", body?.region_id);
  formData.append("created_by", body?.created_by);
  formData.append("farmer_location", body?.farmer_location);
  formData.append("latitude", body?.latitude);
  formData.append("longitude", body?.longitude);
  formData.append("zone_id", body?.zone_id);
  formData.append("seasonal_volume", body?.seasonal_volume);
  formData.append("estimated_yield", body?.estimated_yield);
  formData.append("phone_primary", body?.phone_primary);
  formData.append("phone_secondary", body?.phone_secondary);
  if (body?.lead_farmer_id) {
    formData.append("lead_farmer_id", body?.lead_farmer_id);
  } else if (body?.sub_agent_id) {
    formData.append("sub_agent_id", body?.sub_agent_id);
  } else if (body?.agent_id) {
    formData.append("agent_id", body?.agent_id);
  } else if (body?.agent_id) {
    formData.append("collection_center_id", body?.collection_center_id);
  }
  if (body?.image_profile) {
    const { uri, type, fileName } = body?.image_profile;
    formData.append("image_profile", { uri, type, name: fileName });
  }
  if (body?.image_card) {
    const { uri, type, fileName } = body?.image_card;
    formData.append("image_card", { uri, type, name: fileName });
  }

  await axiosInstance
    .post(Endpoints.REGISTER_FARMER_ONLINE, bodyData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    .then((res: any) => {
      console.log("here jousha", res.response);
      if (res?.data?.code == 201) {
        showToast({
          type: "success",
          text: res?.data?.message,
        });
        dispatch(deleteAllPlots([]));
        Navigation.navigate(SCREENS.REGISTER);

        return res;
      } else if (!res?.response?.data.status) {
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
        dispatch(deleteAllPlots([]));
        Navigation.navigate(SCREENS.REGISTER);

        return res.data;
      }
    })
    .catch((err) => {
      console.log("err farmer register here", err);
      showToast({
        type: "error",
        text: "Farmer Registration Failed!",
      });
    });
};

export const getFarmersList = async () => {
  return await axiosInstance
    .get(Endpoints.GET_FARMERS_LIST)
    .then((res) => {
      console.log("farmer list", res.data.data);

      return res;
    })
    .catch((err) => {
      console.log("err", err);
      return err;
    });
  // return response;
};
