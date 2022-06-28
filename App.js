import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
import { lightTheme, darkTheme } from "./Theme/Theme";
import Dashboard from "./Screens/Dashboard";

export default function App() {
  const { colors } = useTheme();
  const [isDark, setIsDark] = useState(false);
  return (
    <PaperProvider theme={isDark ? darkTheme : lightTheme}>
      <Dashboard setIsDark={setIsDark} isDark={isDark} />
    </PaperProvider>
  );
}
