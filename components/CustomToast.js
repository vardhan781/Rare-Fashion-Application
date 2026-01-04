import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

const CustomToast = ({ visible, type, message }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const backgroundColor =
    type === "success" ? "#4BB543" : type === "error" ? "#FF4C4C" : "#444";

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.toastContainer, { opacity: fadeAnim, backgroundColor }]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    zIndex: 999,
    elevation: 10,
  },
  toastText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CustomToast;
