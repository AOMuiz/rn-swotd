import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import Keyboard from "./src/components/Keyboard";
import { colors } from "./src/constants";

const NUMBER_OF_TRIES = 6;

export default function App() {
  const word = "HELLO";
  const letters = word.split("");
  const rows = new Array(NUMBER_OF_TRIES).fill(
    new Array(letters.length).fill("a")
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>WORDLE</Text>

      <ScrollView style={styles.map}>
        {rows.map((row) => (
          <View style={styles.row}>
            {row.map((cell) => (
              <View key={cell} style={styles.cell}>
                <Text style={styles.cellText}>{cell.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <Keyboard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 7,
  },
  map: {
    alignSelf: "stretch",
    height: 100,
    marginVertical: 20,
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  cell: {
    borderColor: colors.grey,
    borderWidth: 3,
    flex: 1,
    maxWidth: 70,
    aspectRatio: 1,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    color: colors.lightgrey,
    fontWeight: "bold",
    fontSize: 28,
  },
});
