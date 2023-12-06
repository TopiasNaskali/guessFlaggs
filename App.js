import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import CountryDetailsScreen from "./screens/CountryDetailsScreen";
import FlagsScreen from "./screens/FlagsScreen";
import UserInputScreen from "./screens/UserInputScreen";
import { initDatabase } from "./Database";
import { clearDatabase } from "./Database";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    initDatabase();
    //clearDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="User" component={UserInputScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Flags"
          component={FlagsScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <View style={{ marginLeft: 10 }}>
                <Button
                  onPress={() => {
                    // Your custom logic here
                    Alert.alert(
                      "Confirmation",
                      "Are you sure you want to exit?",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "OK",
                          onPress: () => navigation.goBack(),
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                  title="Back to Home"
                  color="#007AFF" // You can customize the color
                />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
