import Snackbar from "react-native-snackbar";
import { Colors } from "../config/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { emailRegex } from "./regex";
import moment from "moment";
interface hasEmptyInterface {
  key1: string;
  key2: number;
  key3: string;
}
export const TruncateText = (text: string, limit: number) => {
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
};
export const objectToFormData = (obj: any) => {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === "object") {
      const { uri, type, fileName } = value;
      formData.append(key, {
        uri,
        type,
        name: fileName,
      });
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};
export const filterObject = (obj: Object) => {
  return Object.entries(obj)
    .filter(
      ([key, value]) =>
        value !== undefined && value !== {} && value !== "" && value !== null
    )
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

export const removeEmpty = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object") {
      removeEmpty(obj[key]);
    } else if (
      obj[key] === null ||
      obj[key] === undefined ||
      obj[key] === "" ||
      obj[key] === 0
    ) {
      delete obj[key];
    }
  });
  return obj;
};

export const convertToFormData = (data: Object) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};
export const generateRandomNumber = (): number => {
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += Math.floor(Math.random() * 10);
  }

  const res = parseFloat(result);
  return res;
};
export const hasEmptyValues = (obj: hasEmptyInterface) => {
  for (const key in obj) {
    if (obj[key] === 0 || obj[key] === "") {
      return true;
    }
  }
  return false;
};
export const isObjectEmpty = (obj: any) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object") {
        if (!isObjectEmpty(obj[key])) {
          return false;
        }
      } else if (obj[key] !== undefined && obj[key] !== "" && obj[key] !== 0) {
        return false;
      }
    }
  }
  return true;
};
// This function uses a for loop to iterate through the properties of the object, and it uses the hasOwnProperty method to check if the property belongs to the object. If the property value is an object, the function calls itself recursively to check if that object is empty. If the property value is not undefined or an empty string, the function returns false. If all properties are either undefined or an empty string, the function returns true, indicating that the object is empty.

export const generateFarmerKey = (
  regionName: string,
  accountType: string,
  userId: number
) => {
  let farmer_key;

  if (regionName && accountType && userId) {
    let regionIntial = regionName
      .split(" ")
      .map((word) => word.substring(0, 2))
      .join("")
      .toUpperCase();
    let accountTypeIntial = accountType
      .split(" ")
      .map((word) => word.substring(0, 2))
      .join("")
      .toUpperCase();

    let currentDateTime = new Date(new Date())
      .toLocaleDateString()
      .replace(/\//g, "");

    console.log(
      "farmer key generated >>>>>>",
      regionIntial + accountTypeIntial + currentDateTime + userId
    );

    farmer_key = regionIntial + accountTypeIntial + currentDateTime + userId;

    console.log({});
  }
  return farmer_key;
};
export const showToast = ({
  text = "",
  type = "success",
  duration = "short",
  action = {},
}) => {
  Snackbar.show({
    text,
    duration:
      duration === "short" ? Snackbar.LENGTH_SHORT : Snackbar.LENGTH_LONG,
    numberOfLines: 1,
    textColor:
      type === "success"
        ? Colors.Success_text
        : type === "error"
        ? Colors.Error_text
        : Colors.Info_text,
    backgroundColor:
      type === "success"
        ? Colors.Toast_success
        : type === "error"
        ? Colors.Toast_error
        : Colors.Toast_info,
    // action: {
    //   text: action.text,
    //   textColor: action.textColor || Colors.Info_text,
    //   onPress: action.onPress,
    // },
  });
};

export const addPlotToList = (plotList: Object[], plot: Object) => {
  // const existingPlot = plotList.find((plotItem) => plotItem.lat === plot.lat && );
  console.log("plotform >>", plot);
  // if (existingPlot) {
  //   console.log(`Error: Plot "${plot}" already exists in the list.`);
  // } else {
  plotList.push(plot);
  console.log(`Plot "${plot}" added to the list.`);
  return plotList;
  // }
};
export const updatePlot = (plotList: Object[], plot: Object) => {
  console.log("plotform update>>", plot);

  const index = plotList.findIndex((obj: any) => obj.id === plot.id);
  if (index !== -1) {
    plotList.splice(index, 1, plot);
  }

  console.log(`Plot "${plot.id}" added to the list.`);
  console.log("updated plot List reducer>>>", plotList);
  return plotList;
};

export const deletePlotFromPlotList = (
  array: Array<Object>,
  plotID: number
) => {
  console.log("in delete plot here >>>" + plotID);
  console.log({ array, plotID });
  return array.filter(function (currentItem: any) {
    return currentItem.id !== plotID;
  });
};
export const validateLink = (link: string) => {
  return emailRegex.test(link);
};

export const isObject = (value: Object) =>
  typeof value === "object" && value !== null;

export const setItem = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};
export const removeItem = async (key: string) =>
  await AsyncStorage.removeItem(key);
export const clearAll = async () => await AsyncStorage.clear();

export const getItem = async (key: string) => await AsyncStorage.getItem(key);
