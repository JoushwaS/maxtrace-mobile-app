import React, { Fragment, useState, useEffect } from "react";

import Screen from "./screen";
import { Header } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { addPLot, updatePlotAction } from "../../../store/actions";
import { showToast, hasEmptyValues, isObjectEmpty } from "../../../utils";
import Navigation from "../../../navigation/root";
import { SCREENS } from "../../../config";

interface IFarmerRegisterScreen {
  route?: any;
}

function Index({ route }: IFarmerRegisterScreen) {
  const dispatch = useDispatch<any>();
  const { plotListSaved, farmerLookUpInfo } = useSelector(
    (state: any) => state.farmerRegistration
  );
  const { editPlotInfo } = route?.params;
  const [isPlotAdded, setisPlotAdded] = useState(false);
  const [isPlotUpdated, setisPlotUpdated] = useState(false);
  const handleAddPlot = async (plotInfo: Object) => {
    const plot_info = isObjectEmpty(plotInfo);

    console.log({ plotInfo });
    if (!plot_info) {
      dispatch(addPLot(plotInfo));
      console.log("plotListSaved>>>>", plotListSaved);
      // return true;
      setisPlotAdded(true);
      showToast({
        type: "success",
        text: "Plot Added Successful!",
      });
      Navigation.navigate(SCREENS.FARMER_REGISTRTION);
    } else {
      showToast({
        type: "error",
        text: "Plot Information Not Completed!",
      });

      setisPlotAdded(false);
      // return false;
    }
  };
  const handleUpdatePlotInfo = async (plotInfo: Object) => {
    const plot_info_update = isObjectEmpty(plotInfo);

    console.log({ plot_info_update });
    if (!plot_info_update) {
      dispatch(updatePlotAction(plotInfo));
      console.log("plotListSaved>>>>", plotListSaved);
      // return true;
      setisPlotUpdated(true);

      showToast({
        type: "success",
        text: "Plot Updated Successful!",
      });
      Navigation.navigate(SCREENS.FARMER_REGISTRTION);
    } else {
      showToast({
        type: "error",
        text: "Plot Information Not Completed!",
      });

      setisPlotUpdated(false);
      // return false;
    }
  };
  useEffect(() => {
    if (editPlotInfo) {
      console.log({ editPlotInfo });
    }
  }, [editPlotInfo]);

  return (
    <Fragment>
      <Header
        // containerStyle={{ padding: "8" }}
        backButton={true}
        back={false}
        text={"Add Plot"}
      />
      <Screen
        plotListSaved={plotListSaved}
        handleAddPlot={handleAddPlot}
        isPlotAdded={isPlotAdded}
        editPlotInfo={editPlotInfo}
        farmerLookUpInfo={farmerLookUpInfo}
        handleUpdatePlotInfo={handleUpdatePlotInfo}
      />
    </Fragment>
  );
}

export default Index;
