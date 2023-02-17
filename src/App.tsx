import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "./config/theme";
import MainNavigation from "./navigation";
import SplashScreen from "react-native-splash-screen";
import NetInfo from "@react-native-community/netinfo";
import { setIsConnected } from "./store/actions";

function App() {
  // const handleInternetConnected = async () => {};
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log(
        "Connection type: " +
          state.type +
          ", Is connected?: " +
          state.isConnected
      );

      store.dispatch(setIsConnected(state.isConnected));
    });

    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          backgroundColor={Colors.White}
          barStyle="dark-content"
          translucent
        />
        <MainNavigation />
      </PersistGate>
    </Provider>
  );
}

export default App;
