import React, { Fragment, useState, useEffect } from "react";

import Screen from "./screen";
import { Header } from "../../../components";
import { useDispatch, useSelector } from "react-redux";

import { showToast, hasEmptyValues } from "../../../utils";
import Navigation from "../../../navigation/root";
import { SCREENS } from "../../../config";
import { getCollectionCentersList } from "../../../config/api/collectionCenter";
import { getCollectionCenterListAction } from "../../../store/actions/collectionCenterAction";

interface IListCollectionCenterScreen {
  route?: any;
}

function Index({ route }: IListCollectionCenterScreen) {
  const dispatch = useDispatch<any>();

  const getCollectionCenter = async () => {
    await getCollectionCentersList()
      .then((res) => {
        console.log("reponse collection center here>>>>>>>", res?.data?.data);
        dispatch(getCollectionCenterListAction(res?.data?.data));
      })
      .catch((error) => {
        console.log(" collection center here error", error);
      });
  };
  useEffect(() => {
    getCollectionCenter();
  }, []);

  return (
    <Fragment>
      <Header
        // containerStyle={{ padding: "8" }}
        backButton={true}
        back={false}
        text={"Pending Collections"}
      />
      <Screen />
    </Fragment>
  );
}

export default Index;
