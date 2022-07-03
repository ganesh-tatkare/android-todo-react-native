import React, { useState } from "react";
import { StatusBar } from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
import { lightTheme, darkTheme } from "./Theme/Theme";
import Dashboard from "./Screens/Dashboard";

const STYLES = ["default", "dark-content", "light-content"];

export default function App() {
  const { colors } = useTheme();
  const [isDark, setIsDark] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);

  return (
    <>
      <PaperProvider theme={isDark ? darkTheme : lightTheme}>
        <StatusBar
          animated={true}
          backgroundColor="#252526"
          barStyle={statusBarStyle}
          showHideTransition="fade"
        />
        <Dashboard setIsDark={setIsDark} isDark={isDark} />
      </PaperProvider>
    </>
  );
}
