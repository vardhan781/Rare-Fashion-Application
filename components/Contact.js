import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Contact = () => {
  const contactMethods = [
    {
      title: "APPLE MESSAGE",
      description:
        "Monday-Saturday from 9AM to 8PM (EST).\nSunday from 10AM to 7PM(EST).",
      icon: <Ionicons name="logo-apple" size={28} color="#FF3E6C" />,
      actionText: "Message Us",
      onPress: () => Linking.openURL("sms:9725312744"),
    },
    {
      title: "PHONE",
      description:
        "Monday-Saturday from 9AM to 11PM (EST).\nSunday from 10AM to 9PM(EST).",
      icon: <MaterialIcons name="phone" size={28} color="#FF3E6C" />,
      actionText: "Call Us +91-972 531 2744",
      onPress: () => Linking.openURL("tel:+919725312744"),
    },
    {
      title: "EMAIL",
      description: "Your inquiry will receive a response from a Client Advisor",
      icon: <MaterialCommunityIcons name="email" size={28} color="#FF3E6C" />,
      actionText: "Write Us",
      onPress: () => Linking.openURL("mailto:info@rarefashion.com"),
    },
    {
      title: "WHATSAPP",
      description:
        "Monday-Saturday from 9AM to 8PM (EST).\nSunday from 10AM to 7PM(EST).",
      icon: <FontAwesome name="whatsapp" size={28} color="#FF3E6C" />,
      actionText: "WhatsApp Us",
      onPress: () => Linking.openURL("https://wa.me/919725312744"),
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>HOW TO CONTACT</Text>
          <Text style={styles.headerSubtitle}>RARE FASHION</Text>
        </View>

        <Text style={styles.subheading}>
          CHOOSE YOUR PREFERRED METHOD OF CONTACT AND CONNECT WITH US
        </Text>

        {/* Contact Methods */}
        <View style={styles.contactMethods}>
          {contactMethods.map((method, index) => (
            <View key={index} style={styles.contactCard}>
              <Text style={styles.methodTitle}>{method.title}</Text>
              <Text style={styles.methodDescription}>{method.description}</Text>

              <TouchableOpacity
                style={styles.contactButton}
                onPress={method.onPress}
              >
                <View style={styles.buttonContent}>
                  {method.icon}
                  <Text style={styles.buttonText}>{method.actionText}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Decorative Elements */}
        <View style={styles.circleAccent} />
        <View style={styles.flowerAccent} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF9FB",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 20,
    marginBottom: 15,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#FF3E6C",
    textAlign: "center",
    fontFamily: "PlayfairDisplay_600SemiBold",
    lineHeight: 32,
  },
  headerSubtitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#FF3E6C",
    textAlign: "center",
    fontFamily: "PlayfairDisplay_600SemiBold",
    marginTop: -5,
  },
  subheading: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Lato_400Regular",
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  contactMethods: {
    marginBottom: 30,
  },
  contactCard: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#FF3E6C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
    fontFamily: "Lato_700Bold",
  },
  methodDescription: {
    fontSize: 13,
    color: "#666",
    marginBottom: 20,
    fontFamily: "Lato_400Regular",
    lineHeight: 18,
  },
  contactButton: {
    backgroundColor: "#FFF0F5",
    borderRadius: 12,
    paddingVertical: 14,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF3E6C",
    marginLeft: 10,
    fontFamily: "Lato_600SemiBold",
  },
  circleAccent: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#FFD6E0",
    opacity: 0.3,
    right: -50,
    top: "20%",
    zIndex: -1,
  },
  flowerAccent: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#FFE5EC",
    opacity: 0.2,
    left: -50,
    bottom: "10%",
    zIndex: -1,
    transform: [{ rotate: "45deg" }],
  },
});

export default Contact;
