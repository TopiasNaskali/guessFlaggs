import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Button } from '@rneui/themed';
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
        <Button
              title="Start Game"
              onPress={() => navigation.navigate("Flags")}
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
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
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: 'black', 
  },
});

export default HomeScreen;
