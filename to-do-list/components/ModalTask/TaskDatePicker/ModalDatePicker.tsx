import { useEffect } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

interface Props {
  modalVisible: any;
  setModalVisible: any;
  setSelectedDate: any;
  selectedDate: string;
}

export default function ModalDatePicker({
  modalVisible,
  setModalVisible,
  setSelectedDate,
  selectedDate,
}: Props) {
  useEffect(() => {
    setModalVisible(false);
  }, [selectedDate]);

  return (
    <>
      <View style={styles.centeredView}>
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
            <View style={styles.modalView}>
              <DatePicker
                options={{
                  backgroundColor: "rgba(30,144,255,1.00)",
                  textHeaderColor: "#fff",
                  textDefaultColor: "#fff",
                  selectedTextColor: "#fff",
                  mainColor: "#F4722B",
                  textSecondaryColor: "#D6C7A1",
                  borderColor: "rgba(122, 146, 165, 0.1)",
                }}
                onDateChange={(date) => setSelectedDate(date)}
                mode="calendar"
              />
            </View>
          </View>
        </Modal>
      </View>
    </>
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
    height: 300, // Custom height
    backgroundColor: "white",
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
});
