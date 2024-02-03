import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogInPage = ({ navigation }) => {
  const [Gmail, setGmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: true,
  });

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.navigate("HomePage");
      }
    };

    checkLoggedInUser();
  }, [navigation]);

  const handleInputPassword = (text) => {
    setPassword(text);
  };

  const handleInputGmail = (text) => {
    setGmail(text);
  };

  async function getUser(token) {
    try {
      const response = await axios.get(
        "https://veli.store/api/user/user_auth/login/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      setError(JSON.stringify(error.response.data));
    }
  }

  const handleLogin = async () => {
    try {
      setError("");

      const response = await axios.post(
        "https://veli.store/api/user/user_auth/login/",
        {
          email: Gmail,
          password: Password,
        }
      );

      if (!response.data.access) {
        setError("Invalid access token");
        return;
      }

      const token = response.data.access;
      AsyncStorage.setItem("token", token);

      await getUser(token);

      navigation.navigate("HomePage");
    } catch (error) {
      setError(JSON.stringify(error.response.data));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Gmail"
          onChangeText={handleInputGmail}
          value={Gmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          onChangeText={handleInputPassword}
          value={Password}
          secureTextEntry
        />
        <TouchableOpacity style={styles.LogInButton} onPress={handleLogin}>
          <Text style={styles.LogText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 60,
    borderColor: "black",
    borderWidth: 1.5,
    marginBottom: 20,
    padding: 10,
    width: 260,
    borderRadius: 20,
  },
  LogInButton: {
    backgroundColor: "black",
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  LogText: {
    color: "white",
    fontSize: 18,
  },
});

export default LogInPage;
