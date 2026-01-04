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

const { height, width } = Dimensions.get("window");

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
          <Image
            source={assets.menu}
            style={styles.navbar_img}
            accessible={false}
          />
        </TouchableOpacity>
        <Text style={styles.navbar_header}>HOME</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={handleLoginPress}>
          <Image
            source={assets.login_path}
            style={styles.navbar_img}
            accessible={false}
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
          <Image source={assets.header_1} style={styles.header1_img} />
          <Text style={styles.headertext1}>
            Explore {"\n"} The {"\n"} Latest
          </Text>
          <Text style={styles.headertext2}>Summer Is Here</Text>
        </View>

        <Text style={styles.heading_bar}>Summer Collection</Text>

        <View>
          <Image source={assets.header_2} style={styles.header2_img} />
          <TouchableOpacity
            onPress={() => navigation.navigate("Collection")}
            style={styles.button_container}
          >
            <Text style={styles.shop_button}>shop now</Text>
            <Image source={assets.arrows} style={styles.button_arrow} />
          </TouchableOpacity>
        </View>

        <Text style={styles.heading_bar}>You'll Love These</Text>

        <View style={styles.product_container}>
          <View style={styles.product_display}>
            <TouchableOpacity style={styles.ind_product}>
              <Image source={assets.header_dress} style={styles.product_img} />
              <Text style={styles.quotes}>Dress up, stand out!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ind_product}>
              <Image source={assets.header_denim} style={styles.product_img} />
              <Text style={styles.quotes}>Denim that defines you!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ind_product}>
              <Image source={assets.header_formal} style={styles.product_img} />
              <Text style={styles.quotes}>Own it in formal!</Text>
            </TouchableOpacity>
          </View>
          <Pressable onPress={() => navigation.navigate("Collection")}>
            <Image source={assets.right_arrow} style={styles.right_arrow} />
          </Pressable>
        </View>

        <Text style={styles.heading_bar}>Now Or Never</Text>

        <View>
          <Image style={styles.header3_img} source={assets.header_3} />
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
    paddingHorizontal: 20,
    paddingVertical: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  navbar_img: {
    width: width * 0.09,
    height: width * 0.09,
    maxWidth: 34,
    maxHeight: 34,
  },
  navbar_header: {
    fontSize: width > 400 ? 26 : 22,
    fontWeight: "800",
    fontFamily: "Prata-Regular",
    color: "#FF69B4",
  },
  scrollContent: {
    flexGrow: 1,
  },
  header1: {
    marginTop: 16,
  },
  header1_img: {
    width: "100%",
    height: height * 0.28,
    maxHeight: 240,
    position: "relative",
  },
  headertext1: {
    position: "absolute",
    left: 8,
    top: 10,
    fontSize: width > 400 ? 19 : 16,
    fontFamily: "Outfit-Regular",
    color: "white",
  },
  headertext2: {
    position: "absolute",
    right: 10,
    top: 30,
    fontSize: width > 400 ? 19 : 16,
    fontFamily: "Outfit-Regular",
    color: "white",
  },
  heading_bar: {
    paddingVertical: 45,
    fontSize: width > 400 ? 28 : 24,
    textAlign: "center",
    color: "#FF69B4",
    fontFamily: "Prata-Regular",
  },
  header2_img: {
    position: "relative",
    width: "100%",
    height: height * 0.29,
    maxHeight: 250,
  },
  button_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 3,
    position: "absolute",
    right: 5,
    bottom: 10,
    gap: 8,
    backgroundColor: "#ffffff52",
    borderRadius: 34,
  },
  button_arrow: {
    width: width * 0.07,
    height: width * 0.07,
    maxWidth: 28,
    maxHeight: 28,
  },
  shop_button: {
    fontFamily: "Prata-Regular",
    color: "#F157A4",
    fontSize: width > 400 ? 18 : 16,
  },
  product_container: {
    width: "100%",
    height: height * 0.37,
    maxHeight: 320,
    borderWidth: 2,
    borderColor: "#F0A4CA",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    gap: 20,
    marginBottom: 20,
  },
  product_display: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  ind_product: {
    display: "flex",
    width: width * 0.25,
    maxWidth: 100,
    flexDirection: "column",
    gap: 8,
  },
  product_img: {
    width: "100%",
    height: height * 0.18,
    maxHeight: 150,
    aspectRatio: 2 / 3,
  },
  right_arrow: {
    width: width * 0.15,
    height: width * 0.15,
    maxWidth: 64,
    maxHeight: 64,
  },
  quotes: {
    width: "100%",
    textAlign: "center",
    color: "gray",
    fontFamily: "Outfit-Regular",
    fontSize: width > 400 ? 12 : 10,
  },
  header3_img: {
    width: "100%",
    height: height * 0.25,
    maxHeight: 212,
    position: "relative",
  },
  explore_button: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 30,
    backgroundColor: "#fbeaea",
    position: "absolute",
    top: 30,
    left: 20,
    borderWidth: 1,
    borderColor: "hotpink",
  },
  explore_text: {
    fontFamily: "Outfit-Regular",
    fontSize: width > 400 ? 12 : 10,
  },
  logoutPrompt: {
    position: "absolute",
    top: "40%",
    left: "10%",
    right: "10%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 10,
  },
  logoutText: {
    fontSize: width > 400 ? 16 : 14,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Outfit-Regular",
  },
  logoutButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  confirmButton: {
    backgroundColor: "#F157A4",
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontFamily: "Outfit-Regular",
    fontSize: width > 400 ? 14 : 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbeaea",
  },
  bottomPadding: {
    height: 10,
  },
});

export default Home;
