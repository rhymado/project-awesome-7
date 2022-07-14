import React from "react";
import {StatusBar, Text, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";

import Auth from "./screens/auth";
import Profile from "./screens/profile";

const Router = () => {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <Navigator
        initialRouteName="auth"
        screenOptions={{
          title: "Default Title",
        }}>
        <Screen
          name="profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="auth"
          component={Auth}
          options={{
            headerTitle: "Login",
            headerStyle: {
              backgroundColor: "#f1a9f1",
            },
            headerRight: () => (
              <View>
                <Text style={{color: "black"}}>Back</Text>
              </View>
            ),
          }}
        />
      </Navigator>
    </>
  );
};

export default Router;
