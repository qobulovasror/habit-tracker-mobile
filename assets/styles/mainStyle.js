import { StyleSheet } from "react-native";

const mainStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: "100%",
        backgroundColor: "#272730"
    },
    header: {
        fontSize: 28,
        textAlign: 'center',
        margin: 5,
        fontWeight: '500',
        color: "#fff"
    },
    row: {
        display: 'flex',
        flexDirection: "row"
    },
    column: {
        display: 'flex',
        flexDirection: "column"
    },
    between: {
        justifyContent: 'space-between'
    },
    around: {
        justifyContent: 'space-around'
    },
    
})

export default mainStyle;