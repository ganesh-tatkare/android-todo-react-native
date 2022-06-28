import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  FlatList,
  Vibration,
} from "react-native";
import { Title, Switch, useTheme } from "react-native-paper";
import Tasks from "../components/Tasks";
import CustomSnackbar from "../components/CustomSnackbar";
import DropDown from "react-native-paper-dropdown";

let mockList = [
  {
    title: "Dummy task added for testing 🙋‍♂️.",
    isComplete: false,
    id: "abq1",
  },
];

export default function Dashboard(props) {
  const { colors } = useTheme();
  const rewards = [
    "🍕",
    "🍔",
    "🍤",
    "🍧",
    "🍭",
    "🧁",
    "🍿",
    "🍣",
    "🍫",
    "🍩",
    "🍪",
  ];
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState(mockList);
  const [isSnackbarActive, setSnackbarActive] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 20,
      backgroundColor: colors.background,
    },
    titleContainer: {
      flexDirection: "row",
      height: 50,
      justifyContent: "space-between",
      alignItems: "center",
    },
    inputContainer: {
      height: 50,
      justifyContent: "flex-end",
    },
    scrollContainer: {
      paddingTop: 20,
    },
    input: {
      backgroundColor: "white",
      width: 200,
      height: 40,
      borderRadius: 10,
      padding: 10,
    },
  });
  const handleNewTask = (e) => {
    setNewTask(e);
  };

  useEffect(() => {
    getDataAsyncStore().then((response)=>{setTaskList([...response])});
  }, []);

  const handleSubmit = () => {
    let newT = {
      title: newTask,
      isComplete: false,
      id: Math.random().toString(36).substring(2, 7),
    };
    setTaskList((prevTaskList) => {
      return [...prevTaskList, newT];
    });
    storeData([...taskList, newT]);
    setNewTask("");
  };

  const handleCompleteTask = (id) => {
    clearTimeout(snackbarTimeout);
    const newList = taskList.map((task) => {
      if (task.id === id) {
        if (task.isComplete === false) {
          setSnackbarContent(
            `${rewards[Math.floor(Math.random() * 6)]} Task completed`
          );
          setSnackbarActive(true);
        }
        return {
          ...task,
          isComplete: !task.isComplete,
        };
      } else {
        return task;
      }
    });
    setTaskList([...newList]);
    storeData([...newList])
    snackbarTimeout;
  };

  const handleDeleteTask = (id) => {
    clearTimeout(snackbarTimeout);
    setSnackbarContent("Task deleted");
    setSnackbarActive(true);
    setTaskList((prevList) => {
      return prevList.filter((el) => el.id !== id);
    });
    let newList = taskList.filter((el)=>el.id!==id);
    storeData([...newList])
    Vibration.vibrate(100);
    snackbarTimeout;
  };

  //Function for storing task list to local storage
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@taskList", jsonValue);
      console.log("Saved successfully");
    } catch (e) {
      console.error("Error while saving task: ", e);
    }
  };

  // function to get task list from local storage
  const getDataAsyncStore = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@taskList");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const snackbarTimeout = setTimeout(() => {
    setSnackbarActive(false);
  }, 1000);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View>
          <Title style={{ color: colors.primary, fontSize: 30 }}>Tasks</Title>
        </View>
        <Switch
          value={props.isDark}
          onValueChange={() => props.setIsDark(!props.isDark)}
          theme
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={handleNewTask}
          placeholder="Enter todo"
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={styles.scrollContainer}>
        <FlatList
          data={taskList}
          renderItem={(itemData) => {
            return (
              <Tasks
                task={itemData.item}
                handleCompleteTask={handleCompleteTask}
                handleDeleteTask={handleDeleteTask}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      <CustomSnackbar content={snackbarContent} isActive={isSnackbarActive} />
    </View>
  );
}
