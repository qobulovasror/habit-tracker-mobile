import { StyleSheet } from "react-native";

export const viewHabitStyle = StyleSheet.create({
    catGroup: {
        width: "100%",
        backgroundColor: "#34343DFF",
        padding: 10,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between' ,
        marginBottom: 10,
        paddingEnd: 13,
        paddingStart: 13
    },
    inputTitle: {
        fontSize: 20, color: "#fff",
        marginTop: 5
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
        width: '60%'
    },
    btn: {
        borderRadius: 8,
        backgroundColor: "#00f",
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 3
    },
    btnText: {
        color: "#fff",
        fontSize: 17
    },
    changetColor: {
        width: 33,
        height: 33,
        borderRadius: 10,
        margin: 5,
        borderColor: "#fff"
    }
})