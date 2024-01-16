import React from "react";
import { colors } from "constants/appColors";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";

const BackBtn = () => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (navigation.canGoBack()) navigation.goBack();
        }}
        style={[styles.btn]}
      >
        <ArrowLeft size={24} color={"#fff"} />
      </TouchableOpacity>
    </>
  );
};

export default BackBtn;

const styles = StyleSheet.create({
  btn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent1,
  },
});
