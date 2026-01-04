import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { assets } from "../assets/assets";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

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
        <Image style={styles.navbar_profile} source={assets.user} />
        <Text style={styles.greeting}>
          Hey, <Text style={styles.username}>User</Text>
        </Text>
        <Image style={styles.navbar_arrow} source={assets.left_arrow} />
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
                <Pressable onPress={() => navigation.navigate("Orders")}>
                  <Image source={assets.courier} style={styles.thing_img} />
                  <Text style={styles.thing_name}>Orders</Text>
                </Pressable>
              </View>
              <View style={styles.ind_thing}>
                <Pressable onPress={() => navigation.navigate("Wishlist")}>
                  <Image
                    source={assets.wishprofile}
                    style={[styles.thing_img, { marginLeft: width * 0.02 }]}
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
                <Pressable onPress={() => navigation.navigate("Contact")}>
                  <Image source={assets.contact} style={styles.thing_img} />
                  <Text style={styles.thing_name}>Contact{"\n"}Us</Text>
                </Pressable>
              </View>
              <View style={styles.ind_thing}>
                <Pressable onPress={() => navigation.navigate("Privacy")}>
                  <Image source={assets.privacy} style={styles.thing_img} />
                  <Text style={styles.thing_name}>Privacy{"\n"}Policy</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.ind_link}>
            <Text style={styles.head_link}>About RF!</Text>
            <View style={styles.things}>
              <View style={styles.ind_thing}>
                <Pressable onPress={() => navigation.navigate("About")}>
                  <Image source={assets.about} style={styles.thing_img} />
                  <Text style={styles.thing_name}>About{"\n"}Us</Text>
                </Pressable>
              </View>
              <View style={styles.ind_thing}>
                <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
                  <Image source={assets.folder} style={styles.thing_img} />
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
    paddingVertical: height * 0.01,
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbar_profile: {
    width: width * 0.15,
    height: width * 0.15,
    maxWidth: 65,
    maxHeight: 65,
  },
  navbar_arrow: {
    width: width * 0.08,
    height: width * 0.08,
    maxWidth: 34,
    maxHeight: 34,
  },
  greeting: {
    fontSize: width * 0.05,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Lato_600SemiBold",
  },
  username: {
    color: "#FF3E6C",
    fontSize: width * 0.05,
    fontWeight: "700",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: height * 0.05,
  },
  links: {
    display: "flex",
    flexDirection: "column",
    gap: height * 0.02,
    marginTop: height * 0.04,
    width: "100%",
    alignItems: "center",
  },
  ind_link: {
    display: "flex",
    flexDirection: "column",
    gap: height * 0.02,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  head_link: {
    fontSize: width * 0.07,
    fontFamily: "Outfit-SemiBold",
    color: "#454040",
    width: "100%",
    textAlign: "center",
  },
  things: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderTopColor: "#FFC2C2",
    borderTopWidth: 3,
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.04,
  },
  ind_thing: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: height * 0.01,
  },
  thing_img: {
    width: width * 0.13,
    height: width * 0.13,
    maxWidth: 52,
    maxHeight: 52,
  },
  thing_name: {
    fontFamily: "Inter",
    fontSize: width * 0.04,
    textAlign: "center",
    marginTop: height * 0.01,
  },
});
