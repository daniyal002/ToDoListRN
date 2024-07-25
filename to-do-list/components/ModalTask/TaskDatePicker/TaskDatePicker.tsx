import { Pressable, StyleSheet, Text, View } from "react-native";
import ModalDatePicker from "./ModalDatePicker";

interface Props {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  modalVisibleDatePicker: boolean;
  setModalVisibleDatePicker: (visible: boolean) => void;
}

export default function TaskDatePicker({
  selectedDate,
  setSelectedDate,
  modalVisibleDatePicker,
  setModalVisibleDatePicker,
}: Props) {
  return (
    <>
      <ModalDatePicker
        modalVisible={modalVisibleDatePicker}
        setModalVisible={setModalVisibleDatePicker}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />
      <View style={styles.selectDate}>
        <Text style={styles.modalText}>{selectedDate || "Выберите дату"}</Text>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisibleDatePicker(!modalVisibleDatePicker)}
        >
          <Text style={styles.textStyle}>Выбрать дату</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    minWidth: 100,
  },
  buttonOpen: {
    backgroundColor: "#1E90FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  selectDate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 10,
    gap: 10,
  },
});
