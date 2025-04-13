import React, { useState } from 'react';
import {
  ViroARScene,
  ViroText,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
} from '@reactvision/react-viro';
import { StyleSheet, View, Dimensions } from 'react-native';

const modelPath =
  'https://raw.githubusercontent.com/google/filament/main/third_party/models/DamagedHelmet/DamagedHelmet.glb';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');
  const [modelScale, setModelScale] = useState([0.2, 0.2, 0.2]);

  const handleTrackingUpdated = (state: string, reason: ViroTrackingReason) => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setText('Tracking Unavailable');
    }
  };

  const handlePinch = (pinchState: number, scaleFactor: number, source: any) => {
    if (pinchState === 3) return; // pinch end
    const newScale = modelScale.map((s) => s * scaleFactor);
    setModelScale(newScale);
  };

  return (
    <ViroARScene onTrackingUpdated={handleTrackingUpdated}>
      <ViroText
        text={text}
        scale={[0.1, 0.1, 0.1]}
        height={1}
        width={4}
        position={[0, 0.5, -1]}
        style={styles.helloWorldTextStyle}
      />

      <ViroAmbientLight color="#aaaaaa" />
      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[0, -1, -0.2]}
        position={[0, 3, 1]}
        color="#ffffff"
        castsShadow={true}
      />

      <ViroNode position={[0, 0, -1]} dragType="FixedToWorld" onDrag={() => {}}>
        <Viro3DObject
          source={{ uri: modelPath }}
          position={[0, 0.1, 0]}
          scale={modelScale}
          rotation={[0, 0, 0]}
          type="GLB"
          onPinch={handlePinch}
        />
      </ViroNode>
    </ViroARScene>
  );
};

const ARScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: HelloWorldSceneAR }}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 50,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default ARScreen;
