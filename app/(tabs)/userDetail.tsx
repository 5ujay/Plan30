import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppGradient from "@/components/AppGradient";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserDetail = () => {
  const [username, setUsername] = useState("");

  const handleStart = async () => {
    if (username.length > 8) {
      Alert.alert("Error", "Username cannot be greater than 8 characters");
    } else if (username.length === 0) {
      Alert.alert("Error", "Please enter a username");
    } else {
      await AsyncStorage.setItem("username", username);
      router.push("/home");
    }
  };

  return (
    <View className="flex-1">
      <AppGradient colors={["#000000", "#FFD700"]}>
        <View className="flex-1 justify-center items-center p-6">
          {/* Heading */}
          <Text className="text-white text-2xl font-bold text-center mb-8 leading-7">
            Welcome! Please Enter Your Username
          </Text>

          {/* Input Field */}
          <TextInput
            style={{ textAlign: "center" }}  // Text alignment handled via NativeWind
            className="bg-white w-4/5 py-3 px-4 rounded-xl text-base shadow-md mb-6"
            placeholder="Username"
            placeholderTextColor="#8A8A8A"
            value={username}
            onChangeText={setUsername}
            maxLength={8}
          />

          {/* Enter Button */}
          <TouchableOpacity
            onPress={handleStart}
            className="bg-white py-3 px-10 rounded-lg mt-5 shadow-lg"
          >
            <Text className="text-black text-lg font-bold">Enter</Text>
          </TouchableOpacity>

          {/* Note about username */}
          <Text className="text-black text-sm text-center mt-6 italic px-6">
            Once you enter your username, it cannot be changed.
          </Text>
        </View>
      </AppGradient>
    </View>
  );
};

export default UserDetail;
