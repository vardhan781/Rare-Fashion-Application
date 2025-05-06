import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomToast from "../components/CustomToast";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const Login = () => {
  const navigation = useNavigation();
  const { serverUrl, setToken } = useContext(ShopContext);
  const [currState, setCurrState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const showToast = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (currState === "Sign Up") {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const response = await axios.post(`${serverUrl}/api/user/register`, {
          name,
          email,
          password,
          otp,
        });

        if (response.data.success) {
          showToast(response.data.message, "success");
          navigation.navigate("Otp", { email, generatedOtp: otp });
        } else {
          showToast(response.data.message, "error");
        }
      } else {
        const response = await axios.post(`${serverUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          await AsyncStorage.setItem("token", response.data.token);
          showToast("Logged In Successfully!", "success");
          navigation.goBack();
        } else {
          showToast(response.data.message, "error");
          if (response.data.message === "Please Verify") {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            await axios.post(`${serverUrl}/api/user/resend-otp`, {
              email,
              otp,
            });

            navigation.navigate("Otp", { email, generatedOtp: otp });
          }
        }
      }
    } catch (error) {
      console.log("Full error:", error);
      showToast(
        error.response?.data?.message ||
          error.message ||
          "Network error. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#FFF0F5", "#FFE4E1"]} // Soft pink gradient background
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>
              {currState === "Sign Up" ? "Create Account" : "Welcome Back"}
            </Text>

            {currState === "Sign Up" && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Your Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  returnKeyType="done"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                returnKeyType="done"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                returnKeyType="done"
              />
            </View>

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <LinearGradient
                colors={["#FF869E", "#FF5C8A"]}
                style={styles.buttonInner}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>
                  {isLoading
                    ? "Please Wait..."
                    : currState === "Login"
                    ? "Sign In"
                    : "Create Account"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchButton}
              onPress={() =>
                setCurrState(currState === "Login" ? "Sign Up" : "Login")
              }
            >
              <Text style={styles.switchText}>
                {currState === "Sign Up"
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <Text style={styles.switchHighlight}>
                  {currState === "Login" ? "Sign Up" : "Sign In"}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomToast
        visible={toastVisible}
        type={toastType}
        message={toastMessage}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 24,
    padding: 32,
    shadowColor: "#FF5C8A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#FF5C8A",
    marginBottom: 32,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#FF5C8A",
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1,
    borderColor: "#FFD1DC",
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: "#8A4F7D",
  },
  button: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 24,
  },
  buttonInner: {
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  switchButton: {
    marginTop: 24,
    alignItems: "center",
  },
  switchText: {
    color: "#C7A8B3",
    fontSize: 15,
  },
  switchHighlight: {
    color: "#FF5C8A",
    fontWeight: "600",
  },
});

export default Login;
