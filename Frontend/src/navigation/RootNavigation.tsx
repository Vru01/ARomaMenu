import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

// Auth Screens
import {LoginScreen} from "../screens/Auth/LoginScreen";
import {SignupScreen} from "../screens/Auth/SignupScreen";

// Common Screens
import HomeScreen from "../screens/Common/HomeScreen";

// AR Screens
import ARScreen from "../screens/AR/ARScreen";
import HelloWorldSceneAR from "../screens/AR/HelloWorldSceneAR";

// Customer Screens

// Manager Screens

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="AR" component={ARScreen} />
        <Stack.Screen name="WorldAR" component={HelloWorldSceneAR} />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
