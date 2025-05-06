import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Privacy = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FF3E6C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.intro}>
          At Rare Fashion, we respect your privacy and are committed to
          protecting your personal data.
        </Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.paragraph}>
          We collect information you provide when creating an account, making
          purchases, or contacting us, including name, email, shipping address,
          and payment details.
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Data</Text>
        <Text style={styles.paragraph}>
          Your information is used to process orders, improve our services, and
          communicate with you about products and promotions (if you opt-in).
        </Text>

        <Text style={styles.sectionTitle}>3. Data Security</Text>
        <Text style={styles.paragraph}>
          We implement industry-standard security measures including encryption
          and secure servers to protect your personal information.
        </Text>

        <Text style={styles.sectionTitle}>4. Third-Party Sharing</Text>
        <Text style={styles.paragraph}>
          We only share data with necessary service providers (payment
          processors, shipping carriers) and never sell your information to
          third parties.
        </Text>

        <Text style={styles.sectionTitle}>5. Your Rights</Text>
        <Text style={styles.paragraph}>
          You may access, correct, or delete your personal data at any time
          through your account settings or by contacting us.
        </Text>

        <Text style={styles.updatedText}>
          This policy was last updated on June 2023. We may update this policy
          periodically.
        </Text>
      </ScrollView>

      {/* Decorative elements */}
      <View style={styles.petalAccent} />
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
  intro: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 25,
    textAlign: "center",
    fontStyle: "italic",
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
  updatedText: {
    fontSize: 12,
    color: "#999",
    marginTop: 30,
    textAlign: "center",
  },
  petalAccent: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#FFE5EC",
    opacity: 0.2,
    right: -50,
    bottom: 100,
    zIndex: -1,
    transform: [{ rotate: "30deg" }],
  },
});

export default Privacy;
