import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useToDoListStore } from "@/store/toDoListStore";
import { IToDoList } from "@/interface/toDoList";
import TaskForm from "./TaskForm/TaskForm";
import TaskDatePicker from "./TaskDatePicker/TaskDatePicker";
import ModalButtons from "./ModalButtons/ModalButtons";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

interface Props {
  type: "create" | "edit";
  id?: number;
  modalVisible: any;
  setModalVisible: any;
}

export default function ModalTask({
  type,
  id,
  modalVisible,
  setModalVisible,
}: Props) {
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisibleDatePicker, setModalVisibleDatePicker] = useState(false);
  const [titleValue, setTitleValue] = useState<string>("");
  const [taskValue, setTaskValue] = useState<string>("");
  const toDoListById = useToDoListStore((state) =>
    state.getToDoListById(id as number)
  );

  useEffect(() => {
    if (id) {
      setTitleValue(toDoListById?.title as string);
      setTaskValue(toDoListById?.task as string);
      setSelectedDate(toDoListById?.date as string);
    }
  }, [id]);

  const createToDoList = useToDoListStore((state) => state.createToDoList);
  const updateToDoListById = useToDoListStore(
    (state) => state.updateToDoListById
  );
  const toDoList = useToDoListStore((state) => state.toDoList);

  const create = () => {
    const maxId =
      toDoList.length > 0
        ? Math.max(...toDoList.map((task) => task.id ?? 0))
        : 0;
    const newTask: IToDoList = {
      id: maxId + 1,
      title: titleValue,
      task: taskValue,
      date: selectedDate,
      done: false,
    };
    createToDoList(newTask);
    setModalVisible(false);
    setTitleValue("");
    setTaskValue("");
  };

  const edit = () => {
    const newTask: IToDoList = {
      title: titleValue,
      task: taskValue,
      date: selectedDate,
      done: false,
    };
    updateToDoListById(id as number, newTask);
    setModalVisible(false);
    setTitleValue("");
    setTaskValue("");
  };

  const cancel = () => {
    setModalVisible(false);
    setTitleValue("");
    setTaskValue("");
  };

  return (
    <ThemedView
      style={styles.centeredView}
      lightColor="#f5f5f5"
      darkColor="#292929"
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <ThemedView
            style={styles.modalView}
            lightColor="#fff"
            darkColor="#757575"
          >
            <ThemedText style={styles.modalText}>
              {type === "create" ? "Добавление" : "Изменение"} задачи
            </ThemedText>
            <TaskForm
              titleValue={titleValue}
              setTitleValue={setTitleValue}
              taskValue={taskValue}
              setTaskValue={setTaskValue}
            />
            <TaskDatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              modalVisibleDatePicker={modalVisibleDatePicker}
              setModalVisibleDatePicker={setModalVisibleDatePicker}
            />
            <ModalButtons
              onCreate={type === "create" ? create : edit}
              onCancel={cancel}
              type={type}
            />
          </ThemedView>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 320, // Custom width
    height: "auto", // Custom height
    // backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    margin: 20,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  buttonAdd: {
    backgroundColor: "green",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderRadius: 10,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  selectDate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
    margin: 10,
  },
  modalButton: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
});
