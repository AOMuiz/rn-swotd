import { StyleSheet, Text, View, StatusBar } from "react-native";
import { scale } from "react-native-size-matters";
import Game from "./src/components/Game";
import Screen from "./src/components/Screen";
import { colors } from "./src/constants";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>SWOTD</Text>
      <Game />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  title: {
    color: colors.lightgrey,
    fontSize: scale(30),
    fontWeight: "bold",
    letterSpacing: scale(7),
  },
});
