import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Terms = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FF3E6C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Use</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.lastUpdated}>Last updated: June 2023</Text>

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By accessing or using the Rare Fashion mobile application, you agree
          to be bound by these Terms of Use.
        </Text>

        <Text style={styles.sectionTitle}>2. User Responsibilities</Text>
        <Text style={styles.paragraph}>
          You agree not to use the app for any unlawful purpose or in any way
          that might harm, damage, or disparage Rare Fashion.
        </Text>

        <Text style={styles.sectionTitle}>3. Intellectual Property</Text>
        <Text style={styles.paragraph}>
          All content, including designs, text, and images are the exclusive
          property of Rare Fashion and protected by copyright laws.
        </Text>

        <Text style={styles.sectionTitle}>4. Purchases & Returns</Text>
        <Text style={styles.paragraph}>
          All sales are final. Returns must be made within 14 days with original
          tags attached.
        </Text>

        <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          Rare Fashion shall not be liable for any indirect, incidental, or
          consequential damages resulting from use of the app.
        </Text>

        <View style={styles.contactBox}>
          <Text style={styles.contactText}>Questions about our Terms?</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Decorative elements */}
      <View style={styles.pinkCircle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9FB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#FFD6E0",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#FF3E6C",
  },
  content: {
    padding: 25,
    paddingBottom: 40,
  },
  lastUpdated: {
    fontSize: 12,
    color: "#999",
    marginBottom: 25,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF3E6C",
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: "#555",
    marginBottom: 5,
  },
  contactBox: {
    marginTop: 40,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#FF3E6C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  contactText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
    textAlign: "center",
  },
  contactButton: {
    backgroundColor: "#FF3E6C",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  contactButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  pinkCircle: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#FFD6E0",
    opacity: 0.3,
    left: -50,
    bottom: -50,
    zIndex: -1,
  },
});

export default Terms;
