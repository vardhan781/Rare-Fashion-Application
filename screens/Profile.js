import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Profile = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Prata-Regular": require("../assets/fonts/Prata-Regular.ttf"),
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "Outfit-SemiBold": require("../assets/fonts/Outfit-SemiBold.ttf"),
    Inter: require("../assets/fonts/Inter_24pt-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <Ionicons
          name="person-circle-outline"
          size={width * 0.15}
          color="#FF69B4"
        />
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>
            Hey, <Text style={styles.username}>User</Text>
          </Text>
        </View>
        <Ionicons name="arrow-forward" size={width * 0.08} color="#FF69B4" />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.links}>
          <View style={styles.ind_link}>
            <Text style={styles.head_link}>My Account</Text>
            <View style={styles.things}>
              <View style={styles.ind_thing}>
                <Pressable
                  style={styles.iconButton}
                  onPress={() => navigation.navigate("Orders")}
                >
                  <Ionicons
                    name="cube-outline"
                    size={width * 0.13}
                    color="#FF69B4"
                  />
                  <Text style={styles.thing_name}>Orders</Text>
                </Pressable>
              </View>

              <View style={styles.spacer} />

              <View style={styles.ind_thing}>
                <Pressable
                  style={styles.iconButton}
                  onPress={() => navigation.navigate("Wishlist")}
                >
                  <Ionicons
                    name="heart-outline"
                    size={width * 0.13}
                    color="#FF69B4"
                  />
                  <Text style={styles.thing_name}>WishList</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.ind_link}>
            <Text style={styles.head_link}>Help Center</Text>
            <View style={styles.things}>
              <View style={styles.ind_thing}>
                <Pressable
                  style={styles.iconButton}
                  onPress={() => navigation.navigate("Contact")}
                >
                  <Ionicons
                    name="chatbubble-outline"
                    size={width * 0.13}
                    color="#FF69B4"
                  />
                  <Text style={styles.thing_name}>Contact{"\n"}Us</Text>
                </Pressable>
              </View>

              <View style={styles.spacer} />

              <View style={styles.ind_thing}>
                <Pressable
                  style={styles.iconButton}
                  onPress={() => navigation.navigate("Privacy")}
                >
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={width * 0.13}
                    color="#FF69B4"
                  />
                  <Text style={styles.thing_name}>Privacy{"\n"}Policy</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.ind_link}>
            <Text style={styles.head_link}>About RF!</Text>
            <View style={styles.things}>
              <View style={styles.ind_thing}>
                <Pressable
                  style={styles.iconButton}
                  onPress={() => navigation.navigate("About")}
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={width * 0.13}
                    color="#FF69B4"
                  />
                  <Text style={styles.thing_name}>About{"\n"}Us</Text>
                </Pressable>
              </View>

              <View style={styles.spacer} />

              <View style={styles.ind_thing}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => navigation.navigate("Terms")}
                >
                  <Ionicons
                    name="document-text-outline"
                    size={width * 0.13}
                    color="#FF69B4"
                  />
                  <Text style={styles.thing_name}>Terms{"\n"}Of Use</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbeaea",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.02,
  },
  greetingContainer: {
    flex: 1,
    alignItems: "center",
  },
  greeting: {
    fontSize: width * 0.05,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Lato_600SemiBold",
    textAlign: "center",
  },
  username: {
    color: "#FF3E6C",
    fontSize: width * 0.05,
    fontWeight: "700",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: height * 0.05,
  },
  links: {
    flexDirection: "column",
    gap: height * 0.06,
    marginTop: height * 0.03,
    width: "100%",
  },
  ind_link: {
    flexDirection: "column",
    gap: height * 0.015,
    width: "100%",
  },
  head_link: {
    fontSize: width * 0.07,
    fontFamily: "Outfit-SemiBold",
    color: "#454040",
    textAlign: "center",
    paddingBottom: height * 0.015,
  },
  things: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderTopColor: "#FFC2C2",
    borderTopWidth: 3,
    paddingVertical: height * 0.035,
    paddingHorizontal: width * 0.05,
  },
  ind_thing: {
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    width: width * 0.1,
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: width * 0.25,
  },
  thing_name: {
    fontFamily: "Inter",
    fontSize: width * 0.035,
    textAlign: "center",
    marginTop: height * 0.018,
    lineHeight: width * 0.045,
  },
});
