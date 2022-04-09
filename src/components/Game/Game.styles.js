import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { colors } from "../../constants";

export default StyleSheet.create({
  map: {
    alignSelf: "stretch",
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
    maxWidth: scale(70),
    aspectRatio: 1,
    margin: scale(3),
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    color: colors.lightgrey,
    fontWeight: "bold",
    fontSize: scale(20),
  },
});
