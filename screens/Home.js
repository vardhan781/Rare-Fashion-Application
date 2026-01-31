import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState, useRef, useContext, useEffect } from "react";
import { useFonts } from "expo-font";
import { assets } from "../assets/assets";
import Sidebar from "../components/Sidebar";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { ShopContext } from "../context/ShopContext";
import CustomToast from "../components/CustomToast";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const responsiveHeight = (percentage) => (percentage / 100) * height;
const responsiveWidth = (percentage) => (percentage / 100) * width;

function Home() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    "Prata-Regular": require("../assets/fonts/Prata-Regular.ttf"),
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
  });

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarAnimation = useRef(new Animated.Value(-300)).current;
  const [showToast, setShowToast] = useState(false);
  const { token, logout } = useContext(ShopContext);
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF69B4" />
      </View>
    );
  }

  const openSidebar = () => {
    setIsSidebarVisible(true);
    Animated.timing(sidebarAnimation, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnimation, {
      toValue: -300,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => setIsSidebarVisible(false));
  };

  const handleLoginPress = () => {
    if (token) {
      setShowLogoutPrompt(true);
    } else {
      navigation.navigate("Login");
    }
  };

  const handleLogout = () => {
    logout();
    setShowLogoutPrompt(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const handleCancelLogout = () => {
    setShowLogoutPrompt(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isSidebarVisible && (
        <TouchableOpacity
          style={[styles.overlay, { height: height }]}
          onPress={closeSidebar}
          activeOpacity={1}
        />
      )}

      <View style={styles.navbar}>
        <TouchableOpacity activeOpacity={0.7} onPress={openSidebar}>
          <Ionicons
            name="menu-outline"
            size={responsiveWidth(9)}
            color="#FF69B4"
          />
        </TouchableOpacity>
        <Text style={styles.navbar_header}>HOME</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={handleLoginPress}>
          <Ionicons
            name={token ? "log-out-outline" : "log-in-outline"}
            size={responsiveWidth(9)}
            color="#FF69B4"
          />
        </TouchableOpacity>
      </View>
      <CustomToast
        visible={showToast}
        type="success"
        message="You have been logged out"
      />
      {showLogoutPrompt && (
        <View style={styles.logoutPrompt}>
          <Text style={styles.logoutText}>
            You are logged in. Do you want to log out?
          </Text>
          <View style={styles.logoutButtons}>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.confirmButton}
            >
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancelLogout}
              style={styles.cancelButton}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isSidebarVisible}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header1}>
          <Image
            source={assets.header_1}
            style={styles.header1_img}
            resizeMode="cover"
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headertext1}>
              Explore {"\n"} The {"\n"} Latest
            </Text>
            <Text style={styles.headertext2}>Summer Is Here</Text>
          </View>
        </View>

        <Text style={styles.heading_bar}>Summer Collection</Text>

        <View style={styles.header2Container}>
          <Image
            source={assets.header_2}
            style={styles.header2_img}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Collection")}
            style={styles.button_container}
          >
            <Text style={styles.shop_button}>shop now</Text>
            <Ionicons
              name="arrow-forward"
              size={responsiveWidth(7)}
              color="#F157A4"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.heading_bar}>You'll Love These</Text>

        <View style={styles.product_container}>
          <View style={styles.product_display}>
            <TouchableOpacity style={styles.ind_product}>
              <Image
                source={assets.header_dress}
                style={styles.product_img}
                resizeMode="cover"
              />
              <Text style={styles.quotes}>Dress up, stand out!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ind_product}>
              <Image
                source={assets.header_denim}
                style={styles.product_img}
                resizeMode="cover"
              />
              <Text style={styles.quotes}>Denim that defines you!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ind_product}>
              <Image
                source={assets.header_formal}
                style={styles.product_img}
                resizeMode="cover"
              />
              <Text style={styles.quotes}>Own it in formal!</Text>
            </TouchableOpacity>
          </View>
          <Pressable
            style={styles.rightArrowContainer}
            onPress={() => navigation.navigate("Collection")}
          >
            <Ionicons
              name="chevron-forward-circle"
              size={responsiveWidth(15)}
              color="#FF69B4"
            />
          </Pressable>
        </View>

        <Text style={styles.heading_bar}>Now Or Never</Text>

        <View style={styles.header3Container}>
          <Image
            style={styles.header3_img}
            source={assets.header_3}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Collection")}
            style={styles.explore_button}
          >
            <Text style={styles.explore_text}>Explore More!</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <Sidebar
        isVisible={isSidebarVisible}
        onClose={closeSidebar}
        animation={sidebarAnimation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    backgroundColor: "#fbeaea",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.05)",
    zIndex: 1,
  },
  navbar: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1.5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  navbar_header: {
    fontSize: width < 380 ? 22 : width < 420 ? 24 : 26,
    fontWeight: "800",
    fontFamily: "Prata-Regular",
    color: "#FF69B4",
  },
  scrollContent: {
    flexGrow: 1,
  },
  header1: {
    marginTop: responsiveHeight(2),
    position: "relative",
  },
  header1_img: {
    width: "100%",
    height: responsiveHeight(28),
    minHeight: 200,
    maxHeight: 280,
  },
  headerTextContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    padding: responsiveWidth(6),
  },
  headertext1: {
    fontSize: width < 380 ? 14 : width < 420 ? 16 : 18,
    fontFamily: "Outfit-Regular",
    color: "white",
    lineHeight: width < 380 ? 18 : width < 420 ? 22 : 24,
  },
  headertext2: {
    fontSize: width < 380 ? 14 : width < 420 ? 16 : 18,
    fontFamily: "Outfit-Regular",
    color: "white",
    textAlign: "right",
    alignSelf: "flex-start",
  },
  heading_bar: {
    paddingVertical: responsiveHeight(4),
    fontSize: width < 380 ? 20 : width < 420 ? 22 : 24,
    textAlign: "center",
    color: "#FF69B4",
    fontFamily: "Prata-Regular",
    marginTop: responsiveHeight(1),
  },
  header2Container: {
    position: "relative",
    marginHorizontal: responsiveWidth(2),
  },
  header2_img: {
    width: "100%",
    height: responsiveHeight(28),
    minHeight: 180,
    maxHeight: 260,
    borderRadius: responsiveWidth(2),
  },
  button_container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    position: "absolute",
    right: responsiveWidth(2),
    bottom: responsiveHeight(2),
    gap: responsiveWidth(2),
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  shop_button: {
    fontFamily: "Prata-Regular",
    color: "#F157A4",
    fontSize: width < 380 ? 14 : width < 420 ? 16 : 18,
  },
  product_container: {
    width: "92%",
    alignSelf: "center",
    minHeight: responsiveHeight(35),
    borderWidth: 2,
    borderColor: "#F0A4CA",
    borderRadius: responsiveWidth(4),
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(3),
    marginBottom: responsiveHeight(2),
    marginHorizontal: responsiveWidth(4),
  },
  product_display: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: responsiveHeight(1),
  },
  ind_product: {
    flexDirection: "column",
    alignItems: "center",
    width: responsiveWidth(26),
    maxWidth: 120,
  },
  product_img: {
    width: "100%",
    height: responsiveHeight(18),
    minHeight: 120,
    maxHeight: 160,
    borderRadius: responsiveWidth(2),
    aspectRatio: 2 / 3,
  },
  quotes: {
    width: "100%",
    textAlign: "center",
    color: "gray",
    fontFamily: "Outfit-Regular",
    fontSize: width < 380 ? 9 : width < 420 ? 10 : 11,
    marginTop: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(1),
  },
  rightArrowContainer: {
    marginTop: responsiveHeight(1),
  },
  header3Container: {
    position: "relative",
    marginHorizontal: responsiveWidth(2),
    marginBottom: responsiveHeight(4),
  },
  header3_img: {
    width: "100%",
    height: responsiveHeight(24),
    minHeight: 150,
    maxHeight: 220,
    borderRadius: responsiveWidth(2),
  },
  explore_button: {
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1),
    borderRadius: 30,
    backgroundColor: "#fbeaea",
    position: "absolute",
    top: responsiveHeight(3),
    left: responsiveWidth(4),
    borderWidth: 1,
    borderColor: "hotpink",
  },
  explore_text: {
    fontFamily: "Outfit-Regular",
    fontSize: width < 380 ? 10 : width < 420 ? 11 : 12,
    color: "#333",
  },
  logoutPrompt: {
    position: "absolute",
    top: "40%",
    left: "10%",
    right: "10%",
    backgroundColor: "white",
    padding: responsiveWidth(5),
    borderRadius: responsiveWidth(3),
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 10,
  },
  logoutText: {
    fontSize: width < 380 ? 14 : 16,
    textAlign: "center",
    marginBottom: responsiveHeight(2),
    fontFamily: "Outfit-Regular",
  },
  logoutButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  confirmButton: {
    backgroundColor: "#F157A4",
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(1.5),
  },
  cancelButton: {
    backgroundColor: "gray",
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(1.5),
  },
  buttonText: {
    color: "white",
    fontFamily: "Outfit-Regular",
    fontSize: width < 380 ? 12 : 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbeaea",
  },
  bottomPadding: {
    height: responsiveHeight(2),
  },
});

export default Home;
