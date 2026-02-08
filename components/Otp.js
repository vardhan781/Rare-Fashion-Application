import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ShopContext } from "../context/ShopContext";
import CustomToast from "../components/CustomToast";

const { width, height } = Dimensions.get("window");

const Otp = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params;
  const { serverUrl, setToken } = useContext(ShopContext);

  const [otp, setOtp] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const handleOtpSubmit = async () => {
    if (otp === "") {
      showToast("Please enter the OTP", "error");
      return;
    }

    setVerifyLoading(true);
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
      setVerifyLoading(false);
    }
  };

  const resendOtp = async () => {
    setResendLoading(true);
    try {
      await axios.post(`${serverUrl}/api/user/resend-otp`, {
        email,
      });
      showToast("OTP resent successfully", "success");
      setOtp("");
      setTimeLeft(120);
    } catch (error) {
      console.error(error);
      showToast("Failed to resend OTP", "error");
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

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

          {timeLeft > 0 ? (
            <Text
              style={{
                textAlign: "center",
                color: "#8A4F7D",
                marginBottom: 10,
              }}
            >
              OTP expires in {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </Text>
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: "#FF5C8A",
                marginBottom: 10,
                fontWeight: "600",
              }}
            >
              OTP expired. Please get a new code.
            </Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleOtpSubmit}
            disabled={verifyLoading}
          >
            <LinearGradient
              colors={["#FF869E", "#FF5C8A"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>
                {verifyLoading ? "Verifying..." : "Continue"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resendContainer}
            onPress={resendOtp}
            disabled={resendLoading || timeLeft > 0}
          >
            <Text style={styles.resendText}>
              Didn't receive code?{" "}
              <Text style={styles.resendLink}>
                {resendLoading
                  ? "Resending..."
                  : timeLeft > 0
                    ? `Resend in ${timeLeft}s`
                    : "Resend"}
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
    borderRadius: width * 0.06,
    padding: width * 0.08,
    marginHorizontal: width * 0.06,
    shadowColor: "#FF5C8A",
    shadowOffset: { width: 0, height: height * 0.008 },
    shadowOpacity: 0.1,
    shadowRadius: width * 0.04,
    elevation: 8,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "600",
    color: "#FF5C8A",
    marginBottom: height * 0.008,
    textAlign: "center",
  },
  subtitle: {
    fontSize: width * 0.035,
    color: "#8A4F7D",
    marginBottom: height * 0.032,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: height * 0.024,
  },
  label: {
    color: "#FF5C8A",
    marginBottom: height * 0.008,
    fontSize: width * 0.035,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1,
    borderColor: "#FFD1DC",
    padding: height * 0.016,
    borderRadius: width * 0.03,
    fontSize: width * 0.04,
    color: "#8A4F7D",
    textAlign: "center",
    letterSpacing: width * 0.002,
  },
  button: {
    borderRadius: width * 0.03,
    overflow: "hidden",
    marginTop: height * 0.016,
  },
  buttonGradient: {
    padding: height * 0.016,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: width * 0.04,
    fontWeight: "600",
  },
  resendContainer: {
    marginTop: height * 0.024,
    alignItems: "center",
  },
  resendText: {
    color: "#8A4F7D",
    fontSize: width * 0.035,
  },
  resendLink: {
    color: "#FF5C8A",
    fontWeight: "600",
  },
});

export default Otp;
