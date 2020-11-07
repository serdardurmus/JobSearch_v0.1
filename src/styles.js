import { StyleSheet, Dimensions } from 'react-native';

// default değil, parçalayarak alacağız. Bu bir kısa yol
export const topicItem = StyleSheet.create({
    container: {
        padding: 10,
        margin: 5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 7,
    },
    text: {
        fontWeight: "bold",
        color: "white",
    }
})