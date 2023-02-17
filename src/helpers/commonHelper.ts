import { setItem, getItem, removeItem } from "../utils";
//  user local helpers

export const getLocalUserInfo = async () => {
  const userInfo = await getItem("LocalUserInfo");
  console.log("userInfo", userInfo);
  let userLocal;
  if (userInfo) {
    userLocal = JSON.parse(userInfo);
  }
  return userLocal;
};
export const setLocalUserInfo = async (userInfoObject: any) => {
  const userInfoStringfy = JSON.stringify(userInfoObject);
  await setItem("LocalUserInfo", userInfoStringfy);
};

export const deleteLocalUserInfo = async () => {
  await removeItem("LocalUserInfo");
};

// Region Local list Helpers
export const setLocalUserRegionList = async (regionList: any) => {
  const regionListStringfy = JSON.stringify(regionList);
  await setItem("LocalRegionList", regionListStringfy);
};
export const getLocalUserRegionList = async () => {
  const regionListInfo = await getItem("LocalRegionList");
  console.log("regionListInfo", regionListInfo);
  let regionListLocal;
  if (regionListInfo) {
    regionListLocal = JSON.parse(regionListInfo);
  }
  return regionListLocal;
};

export const deleteLocalUserRegionList = async () => {
  await removeItem("LocalRegionList");
};

// REGION LOCAL USER HELPERS
export const setLocalUserRegion = async (region: any) => {
  console.log("setLocalUserRegion>>", region);
  const regionStringfy = JSON.stringify(region);
  await setItem("LocalRegion", regionStringfy);
};
export const getLocalUserRegion = async () => {
  const regionInfo = await getItem("LocalRegion");
  console.log("regionInfo", regionInfo);
  let regionLocal;
  if (regionInfo) {
    regionLocal = JSON.parse(regionInfo);
  }
  return regionLocal;
};

export const deleteLocalUserRegion = async () => {
  await removeItem("LocalRegion");
};
