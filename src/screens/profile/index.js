import {View, Text, Pressable} from "react-native";
import React from "react";

import styles from "./styles";

const Profile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <Pressable onPress={() => navigation.push("profile")}>
        <View>
          <Text style={styles.text}>PUSH</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("profile")}>
        <View>
          <Text style={styles.text}>NAVIGATE</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Profile;
