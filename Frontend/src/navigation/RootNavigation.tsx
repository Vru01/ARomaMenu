import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

// Auth Screens
import {LoginScreen} from "../screens/Auth/LoginScreen";
import {SignupScreen} from "../screens/Auth/SignupScreen";

// Common Screens
import HomeScreen from "../screens/Common/HomeScreen";
import MainPage from "../screens/Common/MainPage";
import ProductScreen from "../screens/Common/ProductScreen";

// AR Screens
import ARScreen from "../screens/AR/ARScreen";
import HelloWorldSceneAR from "../screens/AR/HelloWorldSceneAR";

// Customer Screens
import AllFoods from "../screens/Customer/AllFoods";
import HomePage from "../screens/Customer/HomePage";
import BurgerScreen from "../screens//Customer/BurgersScreen";
import AddToCartScreen from "../screens/Customer/AddToCart";
import PaymentScreen from "../screens/Customer/PaymentScreen";

// Manager Screens
import Restaurants from "../screens/Manager/Restaurants";
import AddFoods from "../screens/Manager/AddFoods";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="AR" component={ARScreen} />
        <Stack.Screen name="WorldAR" component={HelloWorldSceneAR} />
        <Stack.Screen name="Restaurants" component={Restaurants} />
        <Stack.Screen name="AllFoods" component={AllFoods} />
        <Stack.Screen name="AddFoods" component={AddFoods} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="BurgerScreen" component={BurgerScreen} />

        <Stack.Screen name="AddToCart" component={AddToCartScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
