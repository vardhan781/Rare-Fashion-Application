import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { assets } from "../assets/assets";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const About = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={width * 0.06} color="#333" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={assets.about_img}
          style={styles.heroImage}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>About Us</Text>
            <View style={styles.underline}></View>
          </View>

          <View style={styles.paragraphs}>
            <Text style={styles.text}>
              Welcome to <Text style={styles.bold}>RARE FASHION</Text>,
            </Text>
            <Text style={styles.text}>
              where the spirit roams free and the heart beats wild.
            </Text>
            <Text style={styles.text}>
              Inspired by the wild beauty of the Rare Fashion, we celebrate
              diversity, individuality, and endless possibilities.
            </Text>
            <Text style={styles.text}>
              We're more than just a clothing line; we're a sanctuary for the
              daring, the dreamers, and the fiercely independent souls.
            </Text>
          </View>
        </View>
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
    paddingTop: height * 0.02,
  },
  heroImage: {
    width: "100%",
    height: 500,
  },
  content: {
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.03,
    paddingBottom: height * 0.05,
  },
  header: {
    alignItems: "center",
    marginBottom: height * 0.025,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: "600",
    color: "#FF3E6C",
    fontFamily: "PlayfairDisplay_600SemiBold",
    marginBottom: height * 0.01,
  },
  underline: {
    width: width * 0.2,
    height: height * 0.003,
    backgroundColor: "#FF3E6C",
    borderRadius: width * 0.003,
  },
  paragraphs: {
    gap: height * 0.015,
  },
  text: {
    fontSize: width * 0.04,
    lineHeight: width * 0.06,
    color: "#555",
    fontFamily: "Lato_400Regular",
    textAlign: "center",
  },
  bold: {
    fontFamily: "Lato_700Bold",
    color: "#FF3E6C",
  },
});

export default About;
