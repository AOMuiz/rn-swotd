import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { colors, colorsToEmoji } from "../../constants";
import * as Clipboard from "expo-clipboard";

const Number = ({ number, label }) => (
  <View style={{ alignItems: "center" }}>
    <Text style={{ color: colors.lightgrey, fontSize: 40, fontWeight: "bold" }}>
      {number}
    </Text>
    <Text style={{ color: colors.lightgrey, fontSize: 20 }}>{label}</Text>
  </View>
);

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
        backgroundColor: colors.lightgrey,
        alignItems: "center",
        margin: 5,
        padding: 5,
        width: `${percentage}%`,
      }}
    >
      <Text style={{ color: colors.lightgrey, fontSize: 20 }}>{amount}</Text>
    </View>
  </View>
);

const GuessDistribution = () => {
  return (
    <>
      <Text style={styles.subTitle}>GUESS DISTRIBUTION</Text>
      <View style={{ width: "100%", padding: 20 }}>
        <GuessDistributionLine position={0} amount={2} percentage={50} />
        <GuessDistributionLine position={3} amount={2} percentage={70} />
      </View>
    </>
  );
};

const EndScreen = ({ won = false, rows, getCellBGColor }) => {
  const [secondsTillTommorow, setSecondsTillTommorow] = useState(0);
  const [played, setPlayed] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [curStreak, setCurStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const share = () => {
    const textMap = rows
      .map((row, i) => {
        row.map((cell, i) => colorsToEmoji[getCellBGColor(i, j)]).join("");
      })
      .filter((row) => row)
      .join("\n");

    const textToShare = `Wordle \n ${textMap}`;
    Clipboard.setString(textToShare);
    Alert.alert("Copied Successfully", "Share your score on social media");
    console.log(textToShare);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const tommorrow = new Date(
        now.getFullYear(),
        now.getMonth,
        now.getDate + 1
      );
      setSecondsTillTommorow((tommorrow - now) / 1000);
    };

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [third]);

  const formatSeconds = () => {
    const hours = Math.floor(secondsTillTommorow / (60 * 60));
    const minutes = Math.floor((secondsTillTommorow % (60 * 60)) / 60);
    const seconds = Math.floor(secondsTillTommorow % 60);

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Text style={styles.title}>
        {won ? "Congrats" : "Try again Tommorow"}
      </Text>
      <Text style={styles.subTitle}>STATISTICS</Text>
      <View style={{ flexDirection: "row" }}>
        <Number number={played} label={"Played"} />
        <Number number={winRate} label={"Win %"} />
        <Number number={curStreak} label={"Cur streak"} />
        <Number number={maxStreak} label={"Max streak"} />
      </View>
      <GuessDistribution />
      <View style={{ flexDirection: "row" }}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ color: colors.lightgrey }}>Next Wordle</Text>
          <Text
            style={{
              color: colors.lightgrey,
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            {formatSeconds()}
          </Text>
        </View>
        <Pressable
          onPress={share}
          style={{
            flex: 1,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 25,
          }}
        >
          <Text style={{ color: colors.lightgrey }}>Share</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EndScreen;

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
