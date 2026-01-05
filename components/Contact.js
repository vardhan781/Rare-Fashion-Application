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
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={width * 0.06} color="#FF3E6C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contact Us</Text>
          <View style={{ width: width * 0.06 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.contentTitle}>HOW TO CONTACT</Text>
            <Text style={styles.contentSubtitle}>RARE FASHION</Text>
          </View>

          <Text style={styles.subheading}>
            CHOOSE YOUR PREFERRED METHOD OF CONTACT AND CONNECT WITH US
          </Text>

          <View style={styles.contactMethods}>
            {contactMethods.map((method, index) => (
              <View key={index} style={styles.contactCard}>
                <Text style={styles.methodTitle}>{method.title}</Text>
                <Text style={styles.methodDescription}>
                  {method.description}
                </Text>

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
    fontSize: width * 0.06,
    fontWeight: "600",
    color: "#FF3E6C",
    fontFamily: "PlayfairDisplay_600SemiBold",
  },
  scrollContainer: {
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.03,
  },
  titleContainer: {
    marginTop: height * 0.01,
    marginBottom: height * 0.015,
    alignItems: "center",
  },
  contentTitle: {
    fontSize: width * 0.07,
    fontWeight: "600",
    color: "#FF3E6C",
    textAlign: "center",
    fontFamily: "PlayfairDisplay_600SemiBold",
    lineHeight: width * 0.08,
  },
  contentSubtitle: {
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
