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

const Terms = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={width * 0.06} color="#FF3E6C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Terms of Use</Text>
          <View style={{ width: width * 0.06 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.lastUpdated}>Last updated: December 2025</Text>

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
            All sales are final. Returns must be made within 14 days with
            original tags attached.
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

        <View style={styles.pinkCircle} />
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
  lastUpdated: {
    fontSize: width * 0.03,
    color: "#999",
    marginBottom: height * 0.025,
    textAlign: "center",
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
  contactBox: {
    marginTop: height * 0.04,
    backgroundColor: "white",
    borderRadius: width * 0.04,
    padding: width * 0.05,
    alignItems: "center",
    shadowColor: "#FF3E6C",
    shadowOffset: { width: 0, height: height * 0.004 },
    shadowOpacity: 0.1,
    shadowRadius: width * 0.025,
    elevation: 3,
  },
  contactText: {
    fontSize: width * 0.04,
    color: "#666",
    marginBottom: height * 0.015,
    textAlign: "center",
  },
  contactButton: {
    backgroundColor: "#FF3E6C",
    borderRadius: width * 0.06,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.075,
  },
  contactButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: width * 0.04,
  },
  pinkCircle: {
    position: "absolute",
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: "#FFD6E0",
    opacity: 0.3,
    left: -width * 0.1,
    bottom: -width * 0.1,
    zIndex: -1,
  },
});

export default Terms;
