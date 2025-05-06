import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ShopContext } from "../context/ShopContext";
import CustomToast from "../components/CustomToast";

const Otp = ({ route }) => {
  // Keep all existing state and logic exactly the same
  const navigation = useNavigation();
  const { email, generatedOtp } = route.params;
  const { serverUrl, setToken } = useContext(ShopContext);

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  useEffect(() => {
    if (generatedOtp) {
      setOtp(generatedOtp);
    }
  }, [generatedOtp]);

  useEffect(() => {
    if (otp && otp === generatedOtp) {
      handleOtpSubmit();
    }
  }, [otp]);

  const handleOtpSubmit = async () => {
    if (otp === "") {
      showToast("Please enter the OTP", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/api/user/verify-otp`, {
        email,
        otp,
      });

      if (response.data.success) {
        setToken(response.data.token);
        await AsyncStorage.setItem("token", response.data.token);
        showToast("OTP verified successfully", "success");
        navigation.navigate("Main");
      } else {
        showToast(response.data.message, "error");
      }
    } catch (error) {
      console.error(error);
      showToast("An error occurred while verifying OTP", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    setIsLoading(true);
    try {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      await axios.post(`${serverUrl}/api/user/resend-otp`, {
        email,
        otp: newOtp,
      });

      setOtp(newOtp);
      showToast("OTP resent successfully", "success");
    } catch (error) {
      console.error(error);
      showToast("Failed to resend OTP", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#FFF0F5", "#FFE4E1"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Verify Your Account</Text>
          <Text style={styles.subtitle}>We sent a code to {email}</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Verification Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 6-digit code"
              placeholderTextColor="#C7A8B3"
              keyboardType="numeric"
              value={otp}
              onChangeText={setOtp}
              maxLength={6}
              returnKeyType="done"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleOtpSubmit}
            disabled={isLoading}
          >
            <LinearGradient
              colors={["#FF869E", "#FF5C8A"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Verifying..." : "Continue"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resendContainer}
            onPress={resendOtp}
            disabled={isLoading}
          >
            <Text style={styles.resendText}>
              Didn't receive code?{" "}
              <Text style={styles.resendLink}>
                {isLoading ? "Resending..." : "Resend"}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
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
  keyboardView: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 24,
    padding: 32,
    marginHorizontal: 24,
    shadowColor: "#FF5C8A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FF5C8A",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#8A4F7D",
    marginBottom: 32,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 24,
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
    textAlign: "center",
    letterSpacing: 8,
  },
  button: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 16,
  },
  buttonGradient: {
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  resendContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  resendText: {
    color: "#8A4F7D",
    fontSize: 14,
  },
  resendLink: {
    color: "#FF5C8A",
    fontWeight: "600",
  },
});

export default Otp;
