import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button title="Open Camera" onPress={ () => navigation.navigate("CameraScreen") } />
        </View>
    )
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});