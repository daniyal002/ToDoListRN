import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { IToDoList } from "@/interface/toDoList";
import { useToDoListStore } from "@/store/toDoListStore";
import { ThemedView } from "../ThemedView";

interface Props {
  task: IToDoList;
  editTask: (id: number) => void;
}

export default function Task({ task, editTask }: Props) {
  const doneTask = useToDoListStore((state) => state.doneTask);
  const deleteToDoListById = useToDoListStore(
    (state) => state.deleteToDoListById
  );
  const [doneText, setDoneText] = useState<string>();

  useEffect(() => {
    task.done ? setDoneText("Выполнено") : setDoneText("Не выполнено");
  }, [task.done]);

  return (
    <ThemedView
      lightColor="#fff"
      darkColor="#757575"
      style={styles.taskContainer}
    >
      <View style={styles.taskInfo}>
        <ThemedText>№: {task.id}</ThemedText>
        <ThemedText style={styles.title} type="title">
          {task.title}
        </ThemedText>
        <ThemedText style={styles.subtitle} type="subtitle">
          {task.task}
        </ThemedText>
        <ThemedText style={styles.date} lightColor="#888">
          {task.date}
        </ThemedText>
        <ThemedText style={styles.status}>{doneText}</ThemedText>
      </View>
      <View style={styles.taskButton}>
        <Pressable
          style={[styles.button, styles.buttonDone]}
          onPress={() => doneTask(task.id as number, !task.done)}
        >
          <Text style={styles.textStyle}>
            {task.done ? "Отменить" : "Завершить"}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonEdit]}
          onPress={() => editTask(task.id as number)}
        >
          <Text style={styles.textStyle}>Изменить</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonDelete]}
          onPress={() => deleteToDoListById(task.id as number)}
        >
          <Text style={styles.textStyle}>Удалить</Text>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    width: "90%",
    alignSelf: "center",
  },
  taskInfo: {
    margin: 15,
    flexDirection: "column",
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    marginBottom: 5,
  },
  taskButton: {
    margin: 15,
    flexDirection: "column",
    height: "100%",
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    elevation: 2,
    minWidth: 100,
    alignItems: "center",
  },
  buttonDone: {
    backgroundColor: "green",
  },
  buttonEdit: {
    backgroundColor: "blue",
  },
  buttonDelete: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontSize: 16,
  },
});
