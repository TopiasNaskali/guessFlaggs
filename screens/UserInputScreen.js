import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View, ImageBackground } from "react-native";
import { getUsers, saveUser } from "../Database";
import { Button } from '@rneui/themed';

const UserInputScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");

  const handleSaveUser = async () => {
    if (username.trim() !== "") {
      const existingUsers = await getUsers();
      const userExists = existingUsers.some((user) => user.name === username);

      if (userExists) {
        alert("Username " + username + " already exists.");
      } else
        Alert.alert(
          'Are you sure you want to play as "' + username + '"?',
          "You cannot change the name later!",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Save",
              onPress: async () => {
                saveUser(username, 0);
                setUsername("");
                navigation.navigate("Home");
              },
            },
          ]
        );
    } else {
      alert("Enter a valid username!");
    }
  };

  return (
    <ImageBackground
    source={require('../assets/background.jpg')}
    style={styles.backgroundImage}
  >
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Button
              title="Save user" onPress={handleSaveUser}
              buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}
              containerStyle={{
                height: 40,
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{
                color: 'black',
                marginHorizontal: 20,
              }}
            />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default UserInputScreen;
