import { StyleSheet } from "react-native";

const checkHabitStyle = StyleSheet.create({
    listItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: "#34343DFF",
        marginVertical: 7,
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
        marginBottom: 3,
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
    }
})

export default checkHabitStyle;