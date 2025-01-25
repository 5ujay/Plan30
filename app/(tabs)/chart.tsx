import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useTask } from "@/context/TaskContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppGradient from "@/components/AppGradient";

const Dashboard: React.FC = () => {
  const { tasks, setTasks } = useTask();
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalRemaining, setTotalRemaining] = useState(0);

  useEffect(() => {
    let completed = 0;
    let remaining = 0;

    // Calculate completed and remaining tasks
    for (let i = 1; i <= 30; i++) {
      const dayTasks = tasks[i] || [];
      const completedTasks = dayTasks.filter((task) => task.completed).length;
      const remainingTasks = dayTasks.length - completedTasks;

      completed += completedTasks;
      remaining += remainingTasks;
    }

    setTotalCompleted(completed);
    setTotalRemaining(remaining);
  }, [tasks]);

  // Conditional colors for the chart
  const isDataAvailable = totalCompleted + totalRemaining > 0;

  // Pie chart data
  const pieData = isDataAvailable
    ? [
        {
          name: "Completed",
          count: totalCompleted,
          color: "#7fff00", // Gold
          legendFontColor: "#7fff00",
          legendFontSize: 15,
        },
        {
          name: "Remaining",
          count: totalRemaining,
          color: "#FFD700", // Black
          legendFontColor: "#FFD700",
          legendFontSize: 15,
        },
      ]
    : [
        {
          name: "Start",
          count: 1,
          color: "#fff", // Black
          legendFontColor: "#FFD700",
          legendFontSize: 15,
        },
      ];

  // Reset all tasks
  const handleReset = async () => {
    Alert.alert(
      "Reset All Tasks",
      "This will reset all your progress, and you will start fresh. Reset only if you’ve completed all 30 days! 🔄",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("tasks"); // Clear from AsyncStorage
              setTasks({}); // Reset state
            } catch (error) {
              console.error("Error resetting tasks:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1">
      {/* Gradient Background */}
      <AppGradient colors={["#1E1E1E", "#FFD700"]}>
        <View className="flex-1 justify-between px-4 py-6">
          {/* Header */}
          <View className="mt-4">
            <Text className="text-white text-3xl font-bold text-center">
              🏆 Task Dashboard
            </Text>
            <Text className="text-[#FFD700] text-lg font-medium text-center mt-2">
              Power Through Your Goals with Consistency
            </Text>
          </View>

          {/* Pie Chart Section */}
          <View className="mt-10 items-center">
            <Text className="text-[#FFD700] text-xl font-semibold mb-6">
              Overall Task Progress
            </Text>
            <PieChart
              data={pieData}
              width={Dimensions.get("window").width - 40}
              height={240}
              chartConfig={{
                backgroundColor: "white",
                backgroundGradientFrom: "#1E1E1E",
                backgroundGradientTo: "#FFD700",
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor={"count"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              absolute
            />
          </View>

          {/* Motivational Quote */}
          <View className="mt-8">
            <Text className="text-center text-black text-lg font-bold px-6">
              "Some people stop because it's hard, and some people start because
              it's hard."
            </Text>
          </View>

          {/* Additional Encouragement */}
          <View className="mt-6">
            <Text className="text-black text-center text-base px-4">
              Every small step brings you closer to success. Keep going, and
              don't give up—your efforts will pay off!
            </Text>
          </View>

          {/* Reset Button */}
          <View className="flex flex-row justify-between items-center mt-6 space-y-4">
            <Text className="text-black text-lg font-medium">
              Reset After 30 Days to Start Again 🔄
            </Text>
            <TouchableOpacity
              onPress={handleReset}
              className="bg-white py-3 px-6 rounded-lg shadow-md text-black"
            >
              <Text className="text-black text-lg font-semibold">Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </AppGradient>
    </View>
  );
};

export default Dashboard;
