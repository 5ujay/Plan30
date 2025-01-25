import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { useTask } from "@/context/TaskContext";

const DayComponent = () => {
  const { getDayStatus } = useTask();

  // how to route on next page of that day
  const handleDayPress = (dayNumber: number) => {
    router.push({ pathname: "/dayDetail", params: { day: dayNumber } });
  };

  const renderItem = ({ index }: { index: number }) => {
    const day = index + 1;
    const status = getDayStatus(day);

    return (
      <TouchableOpacity
        style={[
          styles.box,
          status === "green" && styles.green,
          status ==="yellow" && styles.yellow
        ]}
        onPress={() => handleDayPress(index + 1)}
      >
        <Text style={styles.text}>Day {index + 1}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={Array(30).fill(null)}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      numColumns={3}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    margin: 10,
    height: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 2, // Added border width
    borderColor: "#000", // Black border color
},

  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  green: {
    backgroundColor: "#88e788",
  },
  yellow: {
    backgroundColor: "#fff157",
  },
});

export default DayComponent;
