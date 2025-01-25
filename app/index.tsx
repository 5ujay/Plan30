import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import * as SplashScreen from "expo-splash-screen"; // Control splash screen
import AppGradient from "@/components/AppGradient"; // Gradient wrapper
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Keep the splash screen visible until the app is ready
SplashScreen.preventAutoHideAsync();

const Index = () => {
  const [imageAnimation] = useState(new Animated.Value(0));
  const [isAppReady, setIsAppReady] = useState(false);

  const handleGetStarted = async () => {
    const storedUsername = await AsyncStorage.getItem("username");
    if (storedUsername) {
      router.push("/home");
    } else {
      router.push("/userDetail");
    }
  };

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Simulate resource loading
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAppReady(true);
        SplashScreen.hideAsync(); // Hide splash screen
      }
    };

    prepareApp();
  }, []);

  useEffect(() => {
    Animated.timing(imageAnimation, {
      toValue: 1,
      duration: 2000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [imageAnimation]);

  if (!isAppReady) {
    // Return null to keep the splash screen visible
    return null;
  }

  return (
    <View className="flex-1">
      {/* Gradient Background */}
      <AppGradient colors={["#000000", "#FFD700"]}>
        <View className="flex-1 justify-center items-center">
          {/* Animated logo */}
          <Animated.Image
            source={require("@/assets/images/logo.png")}
            style={{
              width: 200,
              height: 200,
              opacity: imageAnimation,
              transform: [
                {
                  scale: imageAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            }}
            resizeMode="contain"
          />

          {/* Motivational heading */}
          <Text className="text-white text-center text-3xl mt-10 font-bold">
            Change Your Life in 30 Days
          </Text>
          <Text className="text-white text-center text-lg m-4 font-semibold">
            Take on daily tasks, build positive habits, and become the best
            version of yourself!✨
          </Text>

          {/* Key Points */}
          <View className="mt-8 space-y-4">
            <Text className="text-white text-lg text-center">
              ✔️ Build lasting habits 📝
            </Text>
            <Text className="text-white text-lg text-center">
              ✔️ Stay motivated every day 💥
            </Text>
            <Text className="text-white text-lg text-center">
              ✔️ Achieve your personal goals 🎯
            </Text>
          </View>

          {/* Get Started Button */}
          <TouchableOpacity
            onPress={handleGetStarted}
            className="bg-white py-3 px-6 mt-12 rounded-lg self-center"
          >
            <Text className="text-[#000] text-lg font-bold">
              Get Started 🚀
            </Text>
          </TouchableOpacity>

          {/* Motivational Footer */}
          <Text className="text-black text-sm mt-12 text-center">
            Every day is a new opportunity to improve and grow. 🌱
          </Text>
        </View>
      </AppGradient>
    </View>
  );
};

export default Index;
