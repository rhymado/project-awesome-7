import {View, Text, Pressable, Modal, TextInput} from "react-native";
import React, {useState, useMemo, useEffect} from "react";
import {EventEmitter} from "events";
import {
  sendLocalNotification,
  sendScheduledNotification,
} from "../../helpers/notification";
import {Button} from "@rneui/themed";

import styles from "./styles";

const Square = ({title = "Default", id, chosenSquare, onSquareChosen}) => {
  const squareBg = id === chosenSquare ? styles.positive : styles.negative;
  return (
    <Pressable
      style={{...styles.square, ...squareBg}}
      onPress={() => onSquareChosen(id)}>
      <Text>{title}</Text>
    </Pressable>
  );
};

const Profile = ({navigation}) => {
  const myEvents = useMemo(() => new EventEmitter(), []);
  const [square, setSquare] = useState(0);
  const [isModalShown, setIsModalShown] = useState(false);
  const [isLogoutAllowed, setIsLogoutAllowed] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const onSquareChosen = id => {
    myEvents.emit("square", id);
  };
  useEffect(() => {
    const listener = id => {
      setSquare(id);
    };
    myEvents.on("square", listener);

    return () => myEvents.off("square", listener);
  }, [myEvents]);
  // listener navigation
  useEffect(() => {
    const focusOff = navigation.addListener("focus", () => {
      console.log("Selamat Datang");
    });
    const blurOff = navigation.addListener("blur", () => {
      console.log("Sampai Jumpa");
    });
    const beforeRemoveOff = navigation.addListener("beforeRemove", e => {
      if (isLogoutAllowed) {
        return;
      }
      e.preventDefault();
      setIsModalShown(true);
    });

    return () => {
      focusOff();
      blurOff();
      beforeRemoveOff();
    };
  }, [navigation, isLogoutAllowed]);

  useEffect(() => {
    if (isLogoutAllowed) {
      navigation.navigate("auth");
    }
  }, [navigation, isLogoutAllowed]);
  return (
    <>
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
        <Pressable onPress={() => navigation.navigate("auth")}>
          <View>
            <Text style={styles.text}>LOGOUT</Text>
          </View>
        </Pressable>
        <View style={styles.squareContainer}>
          <Square
            title="1"
            id={1}
            chosenSquare={square}
            onSquareChosen={onSquareChosen}
          />
          <Square
            title="2"
            id={2}
            chosenSquare={square}
            onSquareChosen={onSquareChosen}
          />
        </View>
        <Button
          buttonStyle={styles.loginBtn}
          onPress={() => {
            sendLocalNotification("Local", "This is Local Notification");
          }}>
          <Text style={{color: "black", fontWeight: "700"}}>
            Local Notification
          </Text>
        </Button>
        <Text>Delay</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={text =>
            setDate(new Date(Date.now() + Number(text) * 1000))
          }
          style={{borderWidth: 2, borderColor: "white", padding: 5}}
        />
        <Button
          buttonStyle={styles.loginBtn}
          onPress={() => {
            sendScheduledNotification(
              "Scheduled",
              "This is Scheduled Notification",
              date,
            );
          }}>
          <Text style={{color: "black", fontWeight: "700"}}>
            Scheduled Notification
          </Text>
        </Button>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalShown}
        onRequestClose={() => {
          setIsModalShown(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you Sure?</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setIsLogoutAllowed(true);
                setIsModalShown(!isModalShown);
              }}>
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsModalShown(!isModalShown)}>
              <Text style={styles.textStyle}>No</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Profile;
