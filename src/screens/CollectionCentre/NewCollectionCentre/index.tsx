import React, { Fragment, useState, useEffect } from "react";

import Screen from "./screen";
import { Header } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { addPLot, setZonesListAction } from "../../../store/actions";
import { showToast, hasEmptyValues } from "../../../utils";
import Navigation from "../../../navigation/root";
import { SCREENS } from "../../../config";
import { addCollectionCenter } from "../../../config/api/collectionCenter";
import { getZonesList } from "../../../config/api/common";
import { useFocusEffect } from "@react-navigation/native";

interface ICollectionCenterIndex {
  route?: any;
}

function Index({ route }: ICollectionCenterIndex) {
  const dispatch = useDispatch<any>();
  const { user, region, zoneList } = useSelector((state: any) => state.auth);

  console.log("params route", route?.params);
  const handleAddCollectionCenter = async (collectionCenterInfo: any) => {
    console.log("received in handler>>>>", collectionCenterInfo);
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    await addCollectionCenter(collectionCenterInfo, headers).then((res) => {
      console.log("here", res);
    });
  };
  const handleGetZones = async () => {
    const get_zones_list = await getZonesList()
      .then((res) => {
        console.log("respone get zones list >>", res.data.data);

        dispatch(setZonesListAction(res.data.data));
      })
      .catch((err) => {
        console.log("error get zones", err.response);
      });
  };
  useEffect(() => {
    handleGetZones();
  }, []);

  return (
    <Fragment>
      <Header
        // containerStyle={{ padding: "8" }}
        backButton={true}
        back={false}
        text={"New Collection Center"}
      />
      <Screen
        user={user}
        region={region}
        zoneList={zoneList}
        handleAddCollectionCenter={handleAddCollectionCenter}
      />
    </Fragment>
  );
}

export default Index;
