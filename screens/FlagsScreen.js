import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Alert,
} from "react-native";
import { Button } from '@rneui/themed';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getUsers, saveScore } from "../Database";
import GetFlags from "../hooks/GetFlags";
import { getRandomElements } from "../hooks/GetRandomElements";
import CountryDetailsScreen from "./CountryDetailsScreen";

const { OS } = Platform;

export default function FlagsScreen() {
  const navigation = useNavigation();
  const { flags, fetchFlags, allFlags } = GetFlags();
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(false);
  const [gameState, setGameState] = useState("notStarted");
  
  useEffect(() => {
    const fetchInitialFlags = async () => {
      try {
        const initialFlags = getRandomElements(allFlags, 4);
        await fetchFlags(initialFlags);
      } catch (error) {
        console.error("Error fetching initial flags:", error);
      }
    };

    fetchInitialFlags();
  }, [fetchFlags, allFlags]);

  useEffect(() => {
    if (gameState === "playing") {
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft((prevTime) => prevTime - 1);
        } else {
          setGameState("gameOver");
          clearInterval(timer);
          setTimeLeft(0);
        }
      }, 1000);

      return () => clearInterval(timer);
    } else if (gameState === "gameOver") {
      saveScoreToDatabase();
    }
  }, [gameState, timeLeft]);

  const handleStartGame = () => {
    setScore(0);
    setTimeLeft(100);
    setGameState("playing");
  };

  const saveScoreToDatabase = async () => {
    const users = await getUsers();
  
    if (users.length > 0) {
      const user = users[0];
      if (user.score < score) {
        await saveScore(user.name, score);
        setHighScore(true);
  
        // Show alert for the new high score
        Alert.alert(
          "Congratulations!",
          `You got a new high score: ${score}`,
          [{ text: "OK", onPress: () => setHighScore(false) }]
        );
      }
    } else {
      console.log("User was not found.");
    }
  };

  const renderCountry = ({ item, index }) => {
    const isLastItem = index === flags.length - 1;
    return (
      <View
        style={[
          styles.countryContainer,
          item.isCorrectAnswer && styles.correctContainer,
          isLastItem && { marginBottom: 115 },
        ]}
      >
        <Image source={{ uri: item.flags.png }} style={styles.flagImage} />
        <CountryDetailsScreen
          route={{
            params: {
              countryInfo: {
                name: item.name.common,
                capital: item.capital,
                population: item.population,
                area: item.area,
                flag: item.flags.png,
              },
              setScore: setScore,
            },
          }}
        />
      </View>
    );
  };

  const handleGame = async () => {
    if (gameState === "playing") {
      const randomFlags = getRandomElements(allFlags, 4);
      fetchFlags(randomFlags);
    } else {
      setScore(0);
      setTimeLeft(100);
      setGameState("playing");

      try {
        const randomFlags = getRandomElements(allFlags, 4);
        await fetchFlags(randomFlags);
      } catch (error) {
        console.error("Error fetching flags:", error);
      }
    }
  };

  return (
    <ImageBackground
    source={require('../assets/background.jpg')}
    style={styles.backgroundImage}
  >
    <KeyboardAvoidingView
      style={[styles.container]}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      {gameState === "notStarted" && (
        <Button title="Start Game" onPress={handleStartGame} />
      )}
      {gameState === "playing" && (
        <>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Correct Answers: {score}</Text>
            <Text style={styles.headerText}>Time Left: {timeLeft} seconds</Text>
          </View>
          <Button title="Get New Flags" onPress={handleGame} />
          <Text style={styles.text}>Flags of the world</Text>
          <FlatList
            data={flags}
            renderItem={renderCountry}
            keyExtractor={(item) => item.name.common}
            numColumns={1}
          />
        </>
      )}
      {gameState === "gameOver" && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <Text style={styles.resultText}>Your Score: {score}</Text>
          <Button title="Play Again" onPress={handleGame} />
        </View>
      )}
    </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  headerContainer: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  countryContainer: {
    margin: 10,
    alignItems: "center",
    width: 385,
    alignSelf: "center",
    //backgroundColor:"white"
  },
  correctContainer: {
    backgroundColor: "green",
    padding: 10,
    margin: -10,
    borderRadius: 10,
  },
  flagImage: {
    width: 100,
    height: 60,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
