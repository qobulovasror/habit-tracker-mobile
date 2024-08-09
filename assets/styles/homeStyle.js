import { StyleSheet } from "react-native";

const homeStyle = StyleSheet.create({
    listItem: {
        padding: 6,
        borderRadius: 10,
        backgroundColor: "#34343DFF",
        marginVertical: 2,
        marginHorizontal: 5
    },
    itemTitle: {
        fontSize: 19,
        color: '#fff'
    },
    itemTimes: {
        fontSize: 17,
        marginEnd: 10,
        marginTop: 3,
        color: "#ddd"
    },
    itemWeeks: {

    },
    weekTitle: {
        fontSize: 17,
        textAlign: 'center',
        color: "#ADADB9FF"
    },
    weekNum: {
        width: 35,
        height: 35,
        textAlign: 'center',
        borderRadius: 50,
        paddingVertical: 8,
        borderWidth: 1.5,
        borderColor: "#00f"
    },
    itemText: {
        color: '#d5d4d4', 
        fontSize: 16,
    },
    itemBtn: {
        padding: 8, 
        height: 43, 
        backgroundColor: "#555555", 
        borderRadius: 8
    }
})

export default homeStyle;