import {StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  text: {
    fontSize: 36,
    color: "white",
  },
  squareContainer: {
    flexDirection: "row",
    height: 100,
  },
  square: {
    flex: 1,
    borderWidth: 5,
    borderColor: "grey",
  },
  positive: {
    backgroundColor: "green",
  },
  negative: {
    backgroundColor: "red",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "grey",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
});
