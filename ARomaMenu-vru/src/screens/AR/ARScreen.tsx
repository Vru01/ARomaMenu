import React, { useState } from "react";
import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import { StyleSheet, View } from "react-native";

const modelPath =
  "https://raw.githubusercontent.com/google/filament/main/third_party/models/DamagedHelmet/DamagedHelmet.glb";

const ModelARScene = () => {
  const [tracking, setTracking] = useState(false);

  const onInitialized = (state: any, reason: ViroTrackingReason) => {
    console.log("Initialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setTracking(true);
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setTracking(false);
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#ffffff" intensity={500} />
      {tracking && (
        <Viro3DObject
          source={{ uri: modelPath }}
          position={[0, 0, -1]}
          scale={[0.2, 0.2, 0.2]}
          rotation={[0, 0, 0]}
          type="GLB"
        />
      )}
    </ViroARScene>
  );
};

const ARScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: ModelARScene }}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

export default ARScreen;
