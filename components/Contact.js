import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Contact = () => {
  const navigation = useNavigation();

  const contactMethods = [
    {
      title: "APPLE MESSAGE",
      description:
        "Monday-Saturday from 9AM to 8PM (EST).\nSunday from 10AM to 7PM(EST).",
      icon: <Ionicons name="logo-apple" size={width * 0.07} color="#FF3E6C" />,
      actionText: "Message Us",
      onPress: () => Linking.openURL("sms:9725312744"),
    },
    {
      title: "PHONE",
      description:
        "Monday-Saturday from 9AM to 11PM (EST).\nSunday from 10AM to 9PM(EST).",
      icon: <MaterialIcons name="phone" size={width * 0.07} color="#FF3E6C" />,
      actionText: "Call Us +91-972 531 2744",
      onPress: () => Linking.openURL("tel:+919725312744"),
    },
    {
      title: "EMAIL",
      description: "Your inquiry will receive a response from a Client Advisor",
      icon: (
        <MaterialCommunityIcons
          name="email"
          size={width * 0.07}
          color="#FF3E6C"
        />
      ),
      actionText: "Write Us",
      onPress: () => Linking.openURL("mailto:info@rarefashion.com"),
    },
    {
      title: "WHATSAPP",
      description:
        "Monday-Saturday from 9AM to 8PM (EST).\nSunday from 10AM to 7PM(EST).",
      icon: <FontAwesome name="whatsapp" size={width * 0.07} color="#FF3E6C" />,
      actionText: "WhatsApp Us",
      onPress: () => Linking.openURL("https://wa.me/919725312744"),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={width * 0.06} color="#333" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>HOW TO CONTACT</Text>
          <Text style={styles.headerSubtitle}>RARE FASHION</Text>
        </View>

        <Text style={styles.subheading}>
          CHOOSE YOUR PREFERRED METHOD OF CONTACT AND CONNECT WITH US
        </Text>

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

        <View style={styles.circleAccent} />
        <View style={styles.flowerAccent} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF9FB",
  },
  backButton: {
    position: "absolute",
    top: height * 0.04,
    left: width * 0.04,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: width * 0.05,
    padding: width * 0.02,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF9FB",
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.04,
    paddingTop: height * 0.02,
  },
  header: {
    marginTop: height * 0.02,
    marginBottom: height * 0.015,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: width * 0.07,
    fontWeight: "600",
    color: "#FF3E6C",
    textAlign: "center",
    fontFamily: "PlayfairDisplay_600SemiBold",
    lineHeight: width * 0.08,
  },
  headerSubtitle: {
    fontSize: width * 0.07,
    fontWeight: "600",
    color: "#FF3E6C",
    textAlign: "center",
    fontFamily: "PlayfairDisplay_600SemiBold",
    marginTop: -height * 0.005,
  },
  subheading: {
    fontSize: width * 0.035,
    color: "#666",
    textAlign: "center",
    marginBottom: height * 0.03,
    fontFamily: "Lato_400Regular",
    lineHeight: width * 0.05,
    paddingHorizontal: width * 0.05,
  },
  contactMethods: {
    marginBottom: height * 0.03,
  },
  contactCard: {
    backgroundColor: "white",
    borderRadius: width * 0.045,
    padding: width * 0.05,
    marginBottom: height * 0.02,
    shadowColor: "#FF3E6C",
    shadowOffset: { width: 0, height: height * 0.004 },
    shadowOpacity: 0.1,
    shadowRadius: width * 0.04,
    elevation: 5,
  },
  methodTitle: {
    fontSize: width * 0.045,
    fontWeight: "700",
    color: "#333",
    marginBottom: height * 0.008,
    fontFamily: "Lato_700Bold",
  },
  methodDescription: {
    fontSize: width * 0.032,
    color: "#666",
    marginBottom: height * 0.02,
    fontFamily: "Lato_400Regular",
    lineHeight: width * 0.045,
  },
  contactButton: {
    backgroundColor: "#FFF0F5",
    borderRadius: width * 0.03,
    paddingVertical: height * 0.014,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: width * 0.04,
    fontWeight: "600",
    color: "#FF3E6C",
    marginLeft: width * 0.025,
    fontFamily: "Lato_600SemiBold",
  },
  circleAccent: {
    position: "absolute",
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: "#FFD6E0",
    opacity: 0.3,
    right: -width * 0.1,
    top: "20%",
    zIndex: -1,
  },
  flowerAccent: {
    position: "absolute",
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: "#FFE5EC",
    opacity: 0.2,
    left: -width * 0.1,
    bottom: "10%",
    zIndex: -1,
    transform: [{ rotate: "45deg" }],
  },
});

export default Contact;
