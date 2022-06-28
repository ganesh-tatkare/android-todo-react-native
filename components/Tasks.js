import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, {  FadeInUp, FadeOutDown, Layout, } from "react-native-reanimated";

const Tasks = ({ task, handleCompleteTask, handleDeleteTask }) => {
  const handleTaskDel = () => {
    handleDeleteTask(task.id);
  };

  return (
    <View>
      <Animated.View entering={FadeInUp} exiting={FadeOutDown} layout={Layout.springify() }>
        <Pressable onLongPress={() => console.log("Long pressed")}>
          <BouncyCheckbox
            style={styles.checkboxStyle}
            isChecked={task.isComplete}
            key={task.id}
            size={25}
            fillColor="#989898"
            unfillColor="#FFFFFF"
            text={task.title}
            iconStyle={{ borderColor: "#989898", borderRadius: 5 }}
            //handling event by writing function
            onLongPress={handleTaskDel}
            //handling event by passing id using bind method
            onPress={handleCompleteTask.bind(this, task.id)}
          />
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxStyle: {
    paddingVertical: 10,
  },
});

export default Tasks;
