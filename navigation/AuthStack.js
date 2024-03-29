import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateAccountScreen } from "../screens/auth/CreateAccount";
import { LandingScreen } from "../screens/LandingScreen";
import { SurveyTaker } from "../screens/TakeSurvey";

const Auth = createNativeStackNavigator();

/**
 * @returns the auth stack for an unauthenticated user
 */
export const AuthStack = () => {
  return (
    <Auth.Navigator initialRouteName="Landing">
      <Auth.Screen
        name="Landing"
        component={LandingScreen}
      />

      <Auth.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
      />
      <Auth.Screen
        name="Take"
        component={SurveyTaker}
      />
    </Auth.Navigator>
  );
};
