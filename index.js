import "react-native-gesture-handler";
import React from "react";
import {AppRegistry} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import PushNotification from "react-native-push-notification";

import App from "./src";
import {name as appName} from "./app.json";
import {sendLocalNotification} from "./src/helpers/notification";

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  onRegister: token => {
    console.log("token:", token.token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: notification => {
    console.log("NOTIFICATION:", notification);
    sendLocalNotification(notification.title, notification.message);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: notification => {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: err => {
    console.log(err.message, err);
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: "local-notification",
    channelName: "Local Notification",
  },
  created => console.log("channel is ", created ? "created" : "available"),
);
// console.log("request perm");
// PushNotification.requestPermissions();

const AppWithRouter = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </SafeAreaProvider>
);

AppRegistry.registerComponent(appName, () => AppWithRouter);
