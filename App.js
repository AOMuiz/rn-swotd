import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { scale } from "react-native-size-matters";
import Game from "./src/components/Game";
import Screen from "./src/components/Screen";
import { colors } from "./src/constants";

export default function App() {
  return (
    <Screen style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>WORDLE</Text>
      <Game />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.lightgrey,
    fontSize: scale(30),
    fontWeight: "bold",
    letterSpacing: scale(7),
  },
});
