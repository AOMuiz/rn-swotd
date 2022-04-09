import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants";

const GuessDistributionLine = ({ position, amount, percentage }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    }}
  >
    <Text style={{ color: colors.lightgrey }}>{position}</Text>
    <View
      style={{
        alignSelf: "stretch",
        backgroundColor: colors.grey,
        margin: 5,
        padding: 5,
        width: `${percentage}%`,
        minWidth: 20,
      }}
    >
      <Text style={{ color: colors.lightgrey, fontSize: 20 }}>{amount}</Text>
    </View>
  </View>
);

const GuessDistribution = ({ distribution }) => {
  if (!distribution) {
    return null;
  }

  const sum = distribution.reduce((total, dist) => dist + total, 0);
  return (
    <>
      <Text style={styles.subTitle}>GUESS DISTRIBUTION</Text>
      <View style={{ width: "100%", padding: 20 }}>
        {distribution.map((dist, index) => (
          <GuessDistributionLine
            key={index}
            position={index + 1}
            amount={dist}
            percentage={(100 * dist) / sum}
          />
        ))}
      </View>
    </>
  );
};

export default GuessDistribution;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: "white",
  },
  subTitle: {
    fontSize: 20,
    color: colors.lightgrey,
    textAlign: "center",
    marginVertical: 15,
    fontWeight: "bold",
  },
});
