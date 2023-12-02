import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, ImageBackground } from "react-native";
import { getUsers } from "../Database";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState(null);
  const [score, setScore] = useState(null);

  const fetchData = async () => {
    const users = await getUsers();
    if (users.length > 0) {
      setUsername(users[0].name);
      setScore(users[0].score);
    } else {
      // If there are no users, navigate to UserInputScreen
      navigation.navigate("User");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to the flags app</Text>
        {username && <Text style={styles.text}>Playing as: {username}</Text>}
        {username && <Text style={styles.text}>Best Score: {score}</Text>}
        <Button title="Start Game" onPress={() => navigation.navigate("Flags")} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' depending on your use case
    
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: 'black', // adjust text color for better visibility
  },
});

export default HomeScreen;
