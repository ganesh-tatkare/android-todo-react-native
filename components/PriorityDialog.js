import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  RadioButton,
} from "react-native-paper";
import { useTheme } from "react-native-paper";

const PriorityDialog = ({
  priorityVisible,
  setPriority,
  setPriorityVisible,
  handleSubmit,
}) => {
  const [checked, setChecked] = React.useState("first");
  const hideDialog = () => setPriorityVisible(false);

  const { colors } = useTheme();
  const styles = StyleSheet.create({
    DialogContent: {
      flexDirection: "row",
      alignItems: "center",
    },
  });

  return (
    <View>
      <Portal>
        <Dialog visible={priorityVisible} onDismiss={hideDialog} style={{borderRadius:20, backgroundColor:"#efe8f6"}}>
          <Dialog.Title>Choose Priority</Dialog.Title>
          <Dialog.Content>
            <View>
              <View style={styles.DialogContent}>
                <RadioButton
                  color="red"
                  value="first"
                  status={checked === "first" ? "checked" : "unchecked"}
                  onPress={() => setChecked("first")}
                />
                <Text>High</Text>
              </View>
              <View style={styles.DialogContent}>
                <RadioButton
                  color="orange"
                  value="second"
                  status={checked === "second" ? "checked" : "unchecked"}
                  onPress={() => setChecked("second")}
                />
                <Text>Medium</Text>
              </View>
              <View style={styles.DialogContent}>
                <RadioButton
                  color="green"
                  value="third"
                  status={checked === "third" ? "checked" : "unchecked"}
                  onPress={() => setChecked("third")}
                />
                <Text>Low</Text>
              </View>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setPriority(checked);
                hideDialog();
                handleSubmit(checked);
              }}
            >
              Submit
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default PriorityDialog;
