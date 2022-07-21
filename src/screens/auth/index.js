import {View, Text, TextInput, Pressable} from "react-native";
import React, {useState, useEffect, useMemo} from "react";
import {Button} from "@rneui/themed";
import {EventEmitter} from "events";

import styles from "./styles";
import {login} from "../../modules/auth/login";

const Auth = ({navigation}) => {
  const myEvent = useMemo(() => new EventEmitter(), []);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // setup listener event
  useEffect(() => {
    // didmount
    const onLogin = body => {
      console.log(body);
    };
    // const onLogin2 = () => {
    //   console.log("event login 2");
    // };
    myEvent.on("login", onLogin);
    // myEvent.on("login", onLogin2);
    // will unmount
    return () => {
      myEvent.off("login", onLogin);
      // myEvent.off("login", onLogin2);
    };
  }, [myEvent]);
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text>Email</Text>
        <TextInput
          onChangeText={email => setInput({...input, email})}
          value={input.email}
          // editable={false}
          style={styles.textInput}
        />
      </View>
      <View style={styles.section}>
        <Text>Password</Text>
        <TextInput
          onChangeText={password => setInput({...input, password})}
          value={input.password}
          secureTextEntry={!isPasswordShown}
          style={styles.textInput}
        />
      </View>
      <Pressable onPress={() => setIsPasswordShown(!isPasswordShown)}>
        <Text>{isPasswordShown ? "Hide" : "Show"} Password</Text>
      </Pressable>
      <Button
        loading={isLoading}
        buttonStyle={styles.loginBtn}
        onPress={() => {
          setIsLoading(true);
          myEvent.emit("login", {email: input.email, pass: input.password});
          login(
            input.email,
            input.password,
            res => {
              console.log(res.data);
              setIsLoading(false);
              navigation.navigate("profile");
            },
            err => {
              console.log(err);
              setIsLoading(false);
            },
          );
        }}>
        <Text style={{color: "black", fontWeight: "700"}}>Login</Text>
      </Button>
      {/* <TouchableOpacity
        onPress={() => {
          setIsLoading(true);
          login(
            input.email,
            input.password,
            res => {
              console.log(res.data);
              setIsLoading(false);
              navigation.navigate("profile");
            },
            err => {
              console.log(err);
              setIsLoading(false);
            },
          );
        }}
        style={styles.loginBtn}>
        <Text>{isLoading ? "Loading..." : "Login"}</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Auth;
