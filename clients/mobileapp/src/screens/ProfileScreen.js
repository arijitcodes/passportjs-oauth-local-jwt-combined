import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    logout(navigation.dispatch);
  };

  const defaultAvatar = "https://via.placeholder.com/150";

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Image
            source={{ uri: user.picture || defaultAvatar }}
            style={styles.avatar}
          />
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.text}>First Name: {user.firstName || "N/A"}</Text>
          <Text style={styles.text}>Last Name: {user.lastName || "N/A"}</Text>
          <Text style={styles.text}>Email: {user.email || "N/A"}</Text>
          <Text style={styles.text}>
            Email Verified: {user.emailVerified ? "Yes" : "No"}
          </Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Text>Loading...</Text>
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
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default ProfileScreen;
