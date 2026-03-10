import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./RootNavigator";
import * as Font from "expo-font";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AppEntry() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      ...Ionicons.font,
      ...MaterialCommunityIcons.font,
    }).then(() => setFontsLoaded(true));
  }, []);

  return (
    <SafeAreaProvider>
      {fontsLoaded ? (
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      ) : null}
    </SafeAreaProvider>
  );
}
