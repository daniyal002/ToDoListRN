import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import ModalTask from "@/components/ModalTask/ModalTask";
import Task from "@/components/Task/Task";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useToDoListStore } from "@/store/toDoListStore";

export default function HomeScreen() {
  const toDoList = useToDoListStore((state) => state.toDoList);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskId, setTaskId] = useState<number>();
  const [modalType, setModalType] = useState<"create" | "edit">("create");

  const newTask = () => {
    setModalType("create");
    setModalVisible(true);
  };

  const editTask = (id: number) => {
    setModalType("edit");
    setTaskId(id);
    setModalVisible(true);
  };

  return (
    <ThemedView
      style={styles.container}
      lightColor="#f5f5f5"
      darkColor="#292929"
    >
      <ModalTask
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        id={taskId}
        type={modalType}
      />
      <ThemedText style={styles.headerText} lightColor="#333" darkColor="#fff">
        Мой Список Задач
      </ThemedText>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {toDoList
          .toReversed()
          .map(
            (task) =>
               (
                <Task task={task} editTask={editTask} key={task.id} />
              )
          )}
      </ScrollView>
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={newTask}>
        <Text style={styles.textStyle}>Добавить задачу</Text>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  scrollView: {
    paddingVertical: 10,
  },
  taskContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  taskInfo: {
    display: "flex",
    flexDirection: "column",
  },
  taskButton: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  button: {
    alignSelf: "center",
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    marginTop: 20,
    width: "90%",
  },
  buttonOpen: {
    backgroundColor: "#1e90ff",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
