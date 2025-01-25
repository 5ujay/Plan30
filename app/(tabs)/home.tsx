import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import AppGradient from "@/components/AppGradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DayComponent from "@/components/DayComponent";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const Home: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  // Fetch the username from AsyncStorage
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedName = await AsyncStorage.getItem("username");
        if (storedName) {
          setUsername(storedName);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <View className="flex-1">
      {/* Golden-White Gradient */}
      <AppGradient colors={["#ffffff", "#ffffff"]}>
        {/* Header Section */}
        <View className="flex-row justify-between items-center p-6">
          <Text className="text-black text-3xl font-bold">
            {username ? `${username} 🎯` : "Welcome ✨"}
          </Text>
          <Pressable className="flex items-center" onPress={() => router.push("/chart")}>
            <AntDesign name="piechart" size={24} color="#000000" />
            <Text className="text-black font-semibold">Analysis</Text>
          </Pressable>
        </View>

        {/* DayComponent Section */}
        <DayComponent />
      </AppGradient>
    </View>
  );
};

export default Home;
