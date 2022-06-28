import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "react-native-paper";

const CustomSnackbar = (props) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    snackbarContainer: {
      position: "absolute",
      backgroundColor: `${colors.similar}40`,
      borderRadius: 4,
      padding: 7,
      alignItems: "center",
      width: "100%",
      bottom: 50,
      left: 20,
    },
    snackbarFont: {
      color: colors.contrast,
    },
  });

  return (
    <>
      {props.isActive && (
        <View style={styles.snackbarContainer}>
          <Text style={styles.snackbarFont}>{props.content}</Text>
        </View>
      )}
    </>
  );
};

export default CustomSnackbar;
