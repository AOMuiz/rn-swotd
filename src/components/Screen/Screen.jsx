import { StyleSheet, View, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { colors } from "../../constants";

const Screen = ({ children }) => {
  return (
    <SafeAreaView>
      <View style={styles.screen}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.black,
    alignItems: "center",
  },
});

export default Screen;
