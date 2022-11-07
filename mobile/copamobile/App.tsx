import { THEME } from "./src/styles/theme";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { NativeBaseProvider, StatusBar } from "native-base";
import { Loading } from "./src/components/Loading";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const isLoaded = fontsLoaded ? <Routes /> : <Loading />;

  return (
    <AuthContextProvider>
      <NativeBaseProvider theme={THEME}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />
        {isLoaded}
      </NativeBaseProvider>
    </AuthContextProvider>
  );
}
