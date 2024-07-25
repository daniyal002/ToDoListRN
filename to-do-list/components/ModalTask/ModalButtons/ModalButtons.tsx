import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  type: "create" | "edit";
  onCreate: () => void;
  onCancel: () => void;
}

export default function ModalButtons({ onCreate, onCancel, type }: Props) {
  return (
    <View style={styles.modalButton}>
      <Pressable style={[styles.button, styles.buttonAdd]} onPress={onCreate}>
        <Text style={styles.textStyle}>
          {type === "create" ? "Добавить" : "Изменить"} задачу
        </Text>
      </Pressable>
      <Pressable style={[styles.button, styles.buttonClose]} onPress={onCancel}>
        <Text style={styles.textStyle}>Отмена</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 5,
    elevation: 2,
    width: 200,
  },
  buttonClose: {
    backgroundColor: "#FF6347",
  },
  buttonAdd: {
    backgroundColor: "#32CD32",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalButton: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
});
