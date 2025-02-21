import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import Constants from "expo-constants";
import { WebView } from "react-native-webview";

const LoginScreen = () => {
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("password123");
  const { login, setToken, fetchUserProfile } = useAuth();
  const navigation = useNavigation();
  const [showWebView, setShowWebView] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState("");

  const handleSubmit = async () => {
    await login(email, password, navigation.dispatch);
  };

  const handleOAuthLogin = (provider) => {
    const baseUrl =
      Constants.manifest?.extra?.baseApiUrl || "http://192.168.45.1:5000";
    const redirectUrl = Linking.createURL("oauth-callback");
    setWebViewUrl(
      `${baseUrl}/auth/${provider}?client_type=mobile&redirect_uri=${redirectUrl}`
    );
    // Log baseurl and redirectUrl for debugging purposes
    console.log("OAuth Base URL:", baseUrl);
    console.log("OAuth Redirect URL:", redirectUrl);
    setShowWebView(true);
  };

  const handleOAuthCallback = async (token) => {
    try {
      setToken(token);
      await fetchUserProfile(token);
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error handling OAuth callback:", error);
    }
  };

  return (
    <View style={styles.container}>
      {showWebView ? (
        <WebView
          source={{ uri: webViewUrl }}
          onNavigationStateChange={(event) => {
            if (event.url.startsWith("myapp://oauth-callback")) {
              const token = event.url.split("token=")[1];
              handleOAuthCallback(token);
              setShowWebView(false);
            }
          }}
        />
      ) : (
        <>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Login" onPress={handleSubmit} />
          <Button
            title="Login with Google"
            onPress={() => handleOAuthLogin("google")}
          />
          <Button
            title="Login with GitHub"
            onPress={() => handleOAuthLogin("github")}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
