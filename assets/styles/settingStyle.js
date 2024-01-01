import { StyleSheet } from "react-native";

const settingStyle = StyleSheet.create({
  catGroup: {
    width: "100%",
    backgroundColor: "#34343DFF",
    padding: 10,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingEnd: 13,
    paddingStart: 13,
  },
  inputTitle: {
    fontSize: 20,
    color: "#fff",
    marginTop: 5,
  },
  input: {
    fontSize: 18,
    borderRadius: 7,
    marginStart: 5,
    color: "#fff",
    padding: 5,
    paddingHorizontal: 10,
    borderColor: "#fff",
    borderWidth: 0.5,
    width: "60%",
  },
  btn: {
    borderRadius: 8,
    backgroundColor: "#00f",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 3,
    padding: 8,
    backgroundColor: '#52525EFF'
  },
  confBtn: {
    backgroundColor: "#4D4D59FF", 
    padding: 10, 
    borderRadius: 10,
    marginVertical: 5,
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  confBtnText: {
    fontSize: 18, 
    color: "#fff",
  },
  saveBtn: {
    backgroundColor: "#00f", 
    width: '100%', 
    marginVertical: 5, 
    borderRadius: 10, 
    padding: 15
  },
  btnText: {
    color: "#fff", 
    textAlign: 'center', 
    fontSize: 22
  }
});

export default settingStyle;
