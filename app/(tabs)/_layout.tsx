import React from "react";
import { Stack } from "expo-router";

const TabsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="userDetail" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="dayDetail" options={{ headerShown: false }} />
      <Stack.Screen name="chart" options={{ headerShown: false }} />
    </Stack>
  );
};

export default TabsLayout;
