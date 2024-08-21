import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera, runAsync, useCameraDevice, useCameraPermission, useFrameProcessor } from "react-native-vision-camera";
import { useIsFocused } from "@react-navigation/native";
import { useAppState } from "@react-native-community/hooks";
import { useRunOnJS, useSharedValue } from "react-native-worklets-core";

const CameraScreen = () => {
    const device = useCameraDevice('back');
    const { hasPermission, requestPermission } = useCameraPermission();

    const isFocused = useIsFocused();
    const currentAppState = useAppState();

    const [ counter, setCounter ] = useState(0);

    useEffect(() => {
        const getPermissions = async () => {
            if(!hasPermission) await requestPermission();
        };

        getPermissions();
    }, []);

    if (device == null) return <Text>Camera Permissions Error</Text>

    const updateCounter = useRunOnJS(() => setCounter(curr => curr + 1), []);

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet'
        console.log(`useFrameProcessor`, Date.now());

        runAsync(frame, () => {
			'worklet'
			console.log(`✨ runAsync ✨`);

            updateCounter();
		});
    }, [ updateCounter ]);
    
    return (
        <>
            <View style={ styles.liveInfoSection }>
                <Text style={ styles.textCounter }>Counter: { counter }</Text>
            </View>

            <Camera
                style={ StyleSheet.absoluteFill }
                device={ device }
                isActive={ isFocused && currentAppState === 'active' }
                frameProcessor={ frameProcessor }
            />
        </>
    )
};

export default CameraScreen;

const styles = StyleSheet.create({
    liveInfoSection: {
        position: "absolute",
        zIndex: 9,
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        width: "100%"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textCounter: {
        fontSize: 22, 
        fontWeight: "bold", 
        color: "white", 
        backgroundColor: "rgba(0,0,0,0.5)", 
        padding: 10, 
        borderRadius: 10
    }
});