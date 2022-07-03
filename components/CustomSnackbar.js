import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Text, Animated } from "react-native";
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
        <FadeInView style={styles.snackbarContainer}>
          <Text style={styles.snackbarFont}>{props.content}</Text>
        </FadeInView>
      )}
    </>
  );
};


// styled component for fade in transition
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default CustomSnackbar;
