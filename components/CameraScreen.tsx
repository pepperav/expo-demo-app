import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import { useIsFocused } from "@react-navigation/native";
import { useAppState } from "@react-native-community/hooks";

const CameraScreen = () => {
    const device = useCameraDevice('back');
    const { hasPermission, requestPermission } = useCameraPermission();

    const isFocused = useIsFocused();
    const currentAppState = useAppState();

    useEffect(() => {
        const getPermissions = async () => {
            if(!hasPermission) await requestPermission();
        };

        getPermissions();
    }, []);

    if (device == null) return <Text>Camera Permissions Error</Text>
    
    return (
        <Camera
            style={ StyleSheet.absoluteFill }
            device={ device }
            isActive={ isFocused && currentAppState === 'active' }
        />
    )
};

export default CameraScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});