import { StyleSheet, TextInput, useColorScheme } from "react-native";

interface Props {
  titleValue: any;
  setTitleValue: any;
  taskValue: any;
  setTaskValue: any;
}

export default function TaskForm({
  titleValue,
  setTitleValue,
  taskValue,
  setTaskValue,
}: Props) {
  const theme = useColorScheme();
  return (
    <>
      <TextInput
        style={[
          styles.input,
          theme === "dark" ? styles.inputDark : styles.inputLight,
        ]}
        placeholder="Тема задачи"
        placeholderTextColor={theme === "dark" ? "#888" : "#ccc"}
        onChangeText={setTitleValue}
        value={titleValue}
      />
      <TextInput
        style={[
          styles.input,
          theme === "dark" ? styles.inputDark : styles.inputLight,
        ]}
        placeholder="Задача"
        placeholderTextColor={theme === "dark" ? "#888" : "#ccc"}
        onChangeText={setTaskValue}
        value={taskValue}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderRadius: 10,
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    fontSize: 16,
  },
  inputLight: {
    borderColor: "#ccc",
    backgroundColor: "#fff",
    color: "#000",
  },
  inputDark: {
    borderColor: "#555",
    backgroundColor: "#333",
    color: "#fff",
  },
});
