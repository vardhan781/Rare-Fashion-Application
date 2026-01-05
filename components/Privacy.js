import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const Privacy = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={width * 0.06} color="#FF3E6C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Privacy Policy</Text>
          <View style={{ width: width * 0.06 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.intro}>
            At Rare Fashion, we respect your privacy and are committed to
            protecting your personal data.
          </Text>

          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.paragraph}>
            We collect information you provide when creating an account, making
            purchases, or contacting us, including name, email, shipping
            address, and payment details.
          </Text>

          <Text style={styles.sectionTitle}>2. How We Use Your Data</Text>
          <Text style={styles.paragraph}>
            Your information is used to process orders, improve our services,
            and communicate with you about products and promotions (if you
            opt-in).
          </Text>

          <Text style={styles.sectionTitle}>3. Data Security</Text>
          <Text style={styles.paragraph}>
            We implement industry-standard security measures including
            encryption and secure servers to protect your personal information.
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
            This policy was last updated on December 2025. We may update this policy
            periodically.
          </Text>
        </ScrollView>

        <View style={styles.petalAccent} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF9FB",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF9FB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: width * 0.05,
    paddingTop: height * 0.02,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#FFD6E0",
  },
  headerTitle: {
    fontSize: width * 0.055,
    fontWeight: "600",
    color: "#FF3E6C",
  },
  content: {
    padding: width * 0.06,
    paddingBottom: height * 0.04,
  },
  intro: {
    fontSize: width * 0.04,
    lineHeight: width * 0.06,
    color: "#555",
    marginBottom: height * 0.025,
    textAlign: "center",
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: "600",
    color: "#FF3E6C",
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
  },
  paragraph: {
    fontSize: width * 0.035,
    lineHeight: width * 0.055,
    color: "#555",
    marginBottom: height * 0.005,
  },
  updatedText: {
    fontSize: width * 0.03,
    color: "#999",
    marginTop: height * 0.03,
    textAlign: "center",
  },
  petalAccent: {
    position: "absolute",
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: "#FFE5EC",
    opacity: 0.2,
    right: -width * 0.1,
    bottom: height * 0.1,
    zIndex: -1,
    transform: [{ rotate: "30deg" }],
  },
});

export default Privacy;
