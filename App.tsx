import React, { useState } from "react";
import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";

import { StyleSheet } from "react-native";

const modelPath = "https://raw.githubusercontent.com/google/filament/main/third_party/models/DamagedHelmet/DamagedHelmet.glb";
// const modelPath ="https://fihtpzjtefcqzjdyvbxi.supabase.co/storage/v1/object/public/products//burgar_04.glb"
const ModelARScene = () => {
  const [tracking, setTracking] = useState(false);

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setTracking(true);
      // set("Hello World");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setTracking(false);
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color={"#ffffff"} intensity={500} />
      
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

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{ scene: ModelARScene }}
      style={styles.f1}
    />
  );
};

const styles = StyleSheet.create({
  f1: { flex: 1 },

});
