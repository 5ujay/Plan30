import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from "react-native";
import * as SplashScreen from "expo-splash-screen"; // Control splash screen
import { useRouter } from "expo-router"; // Updated router usage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Keep the splash screen visible until the app is ready
SplashScreen.preventAutoHideAsync();

const Index: React.FC = () => {
  const [imageAnimation] = useState(new Animated.Value(0));
  const [isAppReady, setIsAppReady] = useState(false);
  const router = useRouter();

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
    return null; // Keeps the splash screen visible until the app is ready
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        {/* Animated logo */}
        <Animated.Image
          source={require("@/assets/images/logo.png")}
          style={{
            width: 150,
            height: 150,
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
        <Text
          style={{
            color: "#000",
            textAlign: "center",
            fontSize: 28,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Change Your Life in 30 Days
        </Text>
        <Text
          style={{
            color: "#555",
            textAlign: "center",
            fontSize: 16,
            marginTop: 10,
            fontWeight: "500",
          }}
        >
          Take on daily tasks, build positive habits, and become the best
          version of yourself! ✨
        </Text>

        {/* Key Points */}
        <View style={{ marginTop: 30 }}>
          {[
            "✔️ Build lasting habits 📝",
            "✔️ Stay motivated every day 💥",
            "✔️ Achieve your personal goals 🎯",
          ].map((text, index) => (
            <Text
              key={index}
              style={{
                color: "#333",
                fontSize: 16,
                textAlign: "center",
                marginVertical: 5,
              }}
            >
              {text}
            </Text>
          ))}
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          onPress={handleGetStarted}
          style={{
            backgroundColor: "#000",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            marginTop: 40,
          }}
        >
          <Text
            style={{
              color: "#FFF",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Get Started 🚀
          </Text>
        </TouchableOpacity>

        {/* Motivational Footer */}
        <Text
          style={{
            color: "#888",
            fontSize: 14,
            textAlign: "center",
            marginTop: 30,
            fontStyle: "italic",
          }}
        >
          Every day is a new opportunity to improve and grow. 🌱
        </Text>
      </View>
    </View>
  );
};

export default Index;
