import React, { Fragment, useState, useEffect } from "react";

import Screen from "./screen";
import { Header } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../../navigation/root";
import {
  deleteAllPlots,
  deletePlot,
  farmerLookUpInfoAction,
  setZonesListAction,
} from "../../../store/actions";
import { SCREENS } from "../../../config";
import { getFarmerLookUp, getZonesList } from "../../../config/api/common";
import { useIsFocused } from "@react-navigation/native";
import {
  convertToFormData,
  filterObject,
  isObjectEmpty,
  showToast,
} from "../../../utils";
import { addFarmerOnline } from "../../../config/api/farmerRegistration";

interface IFarmerRegisterScreen {
  route?: Object;
}

function Index({ route }: IFarmerRegisterScreen) {
  const isFocused = useIsFocused();
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch<any>();
  const { plotListSaved, farmerLookUpInfo } = useSelector(
    (state: any) => state.farmerRegistration
  );
  const { user, region, zoneList } = useSelector((state: any) => state.auth);

  const { editFarmer } = route?.params;
  console.log("edit item here", editFarmer);
  const handleDeletePlot = (plotID: number) => {
    console.log("delete 2");
    dispatch(deletePlot(plotID));
  };
  const handleEditPlot = (editPlotInfo: Object) => {
    console.log("edit plot", editPlotInfo);
    Navigation.navigate(SCREENS.ADD_PLOT, {
      editPlotInfo: editPlotInfo,
    });
  };

  const handleGetFarmerLookUp = async () => {
    const farmer_look_up_info = await getFarmerLookUp()
      .then((res) => {
        console.log("respone get farmer lookup final>>", res.data.data);
        dispatch(farmerLookUpInfoAction(res.data.data));
      })
      .catch((err) => {
        console.log("error farmer lookup", err.response);
      });
    console.log("farmer_look_up_info", farmer_look_up_info);
  };
  const handleGetZones = async () => {
    const get_zones_list = await getZonesList()
      .then((res) => {
        console.log("respone get zones list >>", res.config);
        dispatch(setZonesListAction(res.data.data));
      })
      .catch((err) => {
        console.log("error get zones", err);
      });
  };
  console.log("zoneList>>>>>>>", zoneList);
  const addArrayOfObjectsToObject = (array: Array<T>, targetObject: Object) => {
    array.forEach((obj) => {
      Object.assign(targetObject, obj);
    });
    return targetObject;
  };
  const convertPlotList = async (plotList: Array<Object>) => {
    let tempList = [];
    let obj: any;
    const tempMap = new Map();

    let count = 0;
    for (const k of plotList) {
      console.log("niazzzzz", k);

      for (const m in k) {
        console.log("JOUSHWA HERW", m);

        if (m != "id" && m != "plotType") {
          tempMap.set(m, k[m]);
          obj = {
            [`plot[${count}][${m}]`]: k[m],
          };
          tempList.push(obj);
        }
      }
      count++;
    }
    console.log("resutl final here", tempList);
    // const finalList = mergeArraysOfObjects();

    return tempList;
  };

  const handleAddFarmerRegistration = async (farmerInfo: any) => {
    setloading(true);

    const con_plots = await convertPlotList(farmerInfo.plotList);
    console.log("con_plots joushwa final>>>>>", con_plots);

    delete farmerInfo.plotList;
    let farmerInfoObject = addArrayOfObjectsToObject(con_plots, farmerInfo);
    const finalObjectFarmer = filterObject(farmerInfoObject);

    const headers = {
      "Content-Type": "multipart/form-data",
    };
    console.log("finalObjectFarmer>>>>>>", finalObjectFarmer);

    await addFarmerOnline(farmerInfoObject, headers, dispatch).then((res) => {
      setloading(false);
    });
  };
  useEffect(() => {
    handleGetFarmerLookUp();
    handleGetZones();
  }, [isFocused]);

  return (
    <Fragment>
      <Header
        // containerStyle={{ padding: "8" }}
        backButton={true}
        back={false}
        text={"Farmer Registration "}
      />
      <Screen
        // {...props}
        plotListSaved={plotListSaved}
        handleAddFarmerRegistration={handleAddFarmerRegistration}
        handleDeletePlot={handleDeletePlot}
        handleEditPlot={handleEditPlot}
        farmerLookUpInfo={farmerLookUpInfo}
        loading={loading}
        user={user}
        region={region}
        zoneList={zoneList}
        isEdit={editFarmer ? true : false}
        editItem={editFarmer}
      />
    </Fragment>
  );
}

export default Index;
