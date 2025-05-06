import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { assets } from "../assets/assets";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

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
                    style={[styles.thing_img, { marginLeft: 8 }]}
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
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbar_profile: {
    width: 65,
    height: 65,
  },
  navbar_arrow: {
    width: 34,
    height: 34,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Lato_600SemiBold",
  },
  username: {
    color: "#FF3E6C",
    fontSize: 20,
    fontWeight: "700",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  ind_link: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  head_link: {
    fontSize: 28,
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
    paddingVertical: 22,
    paddingHorizontal: 15,
  },
  ind_thing: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  thing_img: {
    width: 52,
    height: 52,
  },
  thing_name: {
    fontFamily: "Inter",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});
