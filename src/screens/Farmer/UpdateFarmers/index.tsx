import React, { Fragment, useState, useEffect } from "react";

import Screen from "./screen";
import { Header } from "../../../components";
import { useDispatch, useSelector } from "react-redux";

import { showToast, hasEmptyValues } from "../../../utils";
import Navigation from "../../../navigation/root";
import { SCREENS } from "../../../config";
import { getFarmersList } from "../../../config/api/farmerRegistration";
import { getFarmersListAction } from "../../../store/actions";

interface IUpdateFarmersIndex {
  route?: any;
}

function Index({ route }: IUpdateFarmersIndex) {
  const dispatch = useDispatch<any>();
  const { farmersList } = useSelector((state: any) => state.farmerRegistration);
  const handleFetchFarmerList = async () => {
    await getFarmersList().then((res) => {
      console.log("farmerList here", res);
      dispatch(getFarmersListAction(res.data.data));
    });
  };
  useEffect(() => {
    handleFetchFarmerList();

    if (farmersList?.length != 0) {
      console.log(">>>", farmersList);
    }
  }, []);

  return (
    <Fragment>
      <Header
        // containerStyle={{ padding: "8" }}
        backButton={true}
        back={false}
        text={"Update Farmers "}
      />
      <Screen />
    </Fragment>
  );
}

export default Index;
