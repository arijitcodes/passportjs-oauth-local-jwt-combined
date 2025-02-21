import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";

const OAuthCallbackScreen = () => {
  const { handleOAuthCallback } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const token = route.params?.token;
    if (token) {
      handleOAuthCallback(token).then(() => {
        navigation.navigate("Profile");
      });
    } else {
      navigation.navigate("Login");
    }
  }, [route.params, handleOAuthCallback, navigation]);

  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OAuthCallbackScreen;
