import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateAccountScreen } from "../screens/auth/CreateAccount";
import { LandingScreen } from "../screens/LandingScreen";

const Auth = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Auth.Navigator initialRouteName="Landing">
      <Auth.Screen name="Landing" component={LandingScreen} />

      <Auth.Screen name="CreateAccount" component={CreateAccountScreen} />
    </Auth.Navigator>
  );
};