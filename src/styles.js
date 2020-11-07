import { StyleSheet, Dimensions } from 'react-native';

// default değil, parçalayarak alacağız. Bu bir kısa yol
export const topicItem = StyleSheet.create({
    container: {
        padding: 10,
        margin: 5,
        // marginLeft: 10,
        // marginRight: 10,
        borderRadius: 7,
    },
    text: {
        fontWeight: "bold",
        color: "white",
    }
})

export const introduction = StyleSheet.create({
    banner: {
        height: Dimensions.get("window").height /3,
        justifyContent: "center",
        alignItems: "center",
    },
    bannerText: {
        fontSize: 25,
        fontWeight: "bold",
    }
})

export const jobItem = StyleSheet.create({
    container: {
        padding: 10,
        margin: 5,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "#bdbdbd",
    },
    text: {
        fontWeight: "bold",
        color: "black",
    }
})

export const jobs = StyleSheet.create({
    modalBackground: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        color: "black"
    },
    jobTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black"
    }
})

