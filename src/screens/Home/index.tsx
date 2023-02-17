import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import Screen from "./screen";
import { Header } from "../../components";

interface ILoginScreen {}

function Index(props: ILoginScreen) {
  const { user, regionList } = useSelector((state: any) => state.auth);

  // const { regionList } = useSelector((state: any) => state.common);

  console.log("regionList>>>>>>>>\n", regionList);
  return (
    <Fragment>
      <Header
        // containerStyle={{ padding: "8" }}
        backButton={false}
        back={false}
        text={"Home"}
      />
      <Screen {...props} />
    </Fragment>
  );
}

export default Index;
