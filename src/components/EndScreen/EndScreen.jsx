import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import React, { useState, useEffect } from "react";
import { colors, colorsToEmoji } from "../../constants";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GuessDistribution from "../GuessDistribution";
import { scale } from "react-native-size-matters";

const Number = ({ number, label }) => (
  <View style={{ alignItems: "center", margin: scale(10) }}>
    <Text
      style={{
        color: colors.lightgrey,
        fontSize: scale(30),
        fontWeight: "bold",
      }}
    >
      {number}
    </Text>
    <Text style={{ color: colors.lightgrey, fontSize: scale(16) }}>
      {label}
    </Text>
  </View>
);

const EndScreen = ({ won = false, rows, getCellBGColor }) => {
  const [secondsTillTommorow, setSecondsTillTommorow] = useState(0);
  const [played, setPlayed] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [curStreak, setCurStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [distribution, setDistribution] = useState(null);

  useEffect(() => {
    readState();
  }, []);

  const share = () => {
    const textMap = rows
      .map((row, i) =>
        row.map((cell, j) => colorsToEmoji[getCellBGColor(i, j)]).join("")
      )
      .filter((row) => row)
      .join("\n");

    const textToShare = `Sci-WOTD \n${textMap}`;
    Clipboard.setString(textToShare);
    Alert.alert("Copied Successfully", "Share your score on social media");
    console.log(textToShare);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const tommorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
      setSecondsTillTommorow((tommorrow - now) / 1000);
    };

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatSeconds = () => {
    const hours = Math.floor(secondsTillTommorow / (60 * 60));
    const minutes = Math.floor((secondsTillTommorow % (60 * 60)) / 60);
    const seconds = Math.floor(secondsTillTommorow % 60);

    return `${hours}:${minutes}:${seconds}`;
  };

  const readState = async () => {
    const dataString = await AsyncStorage.getItem("@game");
    console.log(JSON.parse(dataString));
    let data;
    try {
      data = JSON.parse(dataString);
      console.log(data);
    } catch (error) {
      console.log("Couldn't parse state data");
    }

    const keys = Object.keys(data);
    const values = Object.values(data);

    setPlayed(keys.length);

    const numberOfWins = values.filter(
      (game) => game.gameState === "won"
    ).length;
    setWinRate(Math.floor((100 * numberOfWins) / keys.length));

    let _curStreak = 0;
    let maxStreak = 0;
    let prevDay = 0;
    keys.forEach((key) => {
      const day = parseInt(key.split("-")[1]);
      if (data[key].gameState === "won" && _curStreak === 0) {
        _curStreak += 1;
      } else if (data[key].gameState === "won" && prevDay + 1 === day) {
        _curStreak += 1;
      } else {
        if (_curStreak > maxStreak) {
          maxStreak = _curStreak;
        }
        _curStreak = data[key].gameState === "won" ? 1 : 0;
      }
      prevDay = day;
    });
    setCurStreak(_curStreak);
    setMaxStreak(maxStreak);

    // guess distribution
    const dist = [0, 0, 0, 0, 0, 0];

    values.map((game) => {
      if (game.gameState === "won") {
        const tries = game.rows.filter((row) => row[0]).length;
        dist[tries] = dist[tries] + 1;
      }
    });
    setDistribution(dist);
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Animated.Text
          entering={SlideInLeft.springify().mass(0.5)}
          style={styles.title}
        >
          {won ? "Congrats" : "Try again Tommorow"}
        </Animated.Text>

        <Animated.View entering={SlideInLeft.delay(100).springify().mass(0.5)}>
          <Text style={styles.subTitle}>STATISTICS</Text>
          <View style={{ flexDirection: "row" }}>
            <Number number={played} label={"Played"} />
            <Number number={winRate} label={"Win %"} />
            <Number number={curStreak} label={"Cur streak"} />
            <Number number={maxStreak} label={"Max streak"} />
          </View>
        </Animated.View>

        <Animated.View
          entering={SlideInLeft.delay(200).springify().mass(0.5)}
          style={{ width: "100%" }}
        >
          <GuessDistribution distribution={distribution} />
        </Animated.View>

        <Animated.View
          entering={SlideInLeft.delay(200).springify().mass(0.5)}
          style={{ flexDirection: "row", padding: scale(10) }}
        >
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ color: colors.lightgrey }}>Next Sci-WOTD</Text>
            <Text
              style={{
                color: colors.lightgrey,
                fontSize: scale(24),
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
              borderRadius: scale(25),
            }}
          >
            <Text style={{ color: colors.lightgrey }}>Share</Text>
          </Pressable>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default EndScreen;

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
  },
  container: {
    width: "100%",
    alignItems: "center",
    height: "100%",
  },
  title: {
    fontSize: scale(30),
    color: "white",
  },
  subTitle: {
    fontSize: scale(20),
    color: colors.lightgrey,
    textAlign: "center",
    marginVertical: scale(15),
    fontWeight: "bold",
  },
});
