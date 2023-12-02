import React, { useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import checkCountryName from "../hooks/CountryNameValidator";

const CountryDetailsScreen = ({ route }) => {
  const { countryInfo, isCorrectAnswer, setScore } = route.params;
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showButton, setShowButton] = useState(true);

  const inputRef = useRef(null);

  const handleCheckCountryName = () => {
    const result = checkCountryName(userInput, countryInfo.name);
    setFeedback(result);

    if (result.includes("Correct")) {
      inputRef.current.setNativeProps({ editable: false });
      setScore((prevScore) => prevScore + 1);
      setShowButton(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text>Capital: {countryInfo.capital}</Text>
        <Text>Population: {countryInfo.population.toLocaleString()}</Text>
        <Text>Area: {countryInfo.area.toLocaleString()} km²</Text>
        {isCorrectAnswer ? (
          <View style={styles.correctAnswerContainer}>
            <Text style={styles.correctAnswerText}>{countryInfo.name}</Text>
          </View>
        ) : (
          <>
            {showButton && (
              <TouchableOpacity
                style={styles.button}
                onPress={handleCheckCountryName}
              >
                <Text style={styles.buttonText}>Check</Text>
              </TouchableOpacity>
            )}
            {feedback !== "" && <Text style={styles.feedback}>{feedback}</Text>}
          </>
        )}
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Enter country name"
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
          editable={!isCorrectAnswer}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  flagImage: {
    width: 100,
    height: 60,
    marginBottom: 16,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "green",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 23,
  },
  buttonContainer: {
    marginHorizontal: 50,
    height: 50,
    width: 200,
    marginVertical: 10,
  },
  feedback: {
    marginTop: 10,
    color: "green",
  },
});

export default CountryDetailsScreen;
