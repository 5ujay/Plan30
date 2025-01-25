import React from "react";
import { Stack } from "expo-router";
import "../global.css";
import { StatusBar } from "react-native";
import { TaskContextProvider } from "@/context/TaskContext";

const RootLayout = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <TaskContextProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </TaskContextProvider>
    </>
  );
};

export default RootLayout;
