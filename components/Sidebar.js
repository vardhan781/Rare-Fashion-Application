import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Sidebar = ({ isVisible, onClose, animation }) => {
  const navigation = useNavigation();
  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.sidebarContainer,
        { transform: [{ translateX: animation }] },
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.header}>Rare Fashion</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            onClose();
            navigation.navigate("Home");
          }}
        >
          <Ionicons name="home-outline" size={width * 0.05} color="#FF69B4" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            onClose();
            navigation.navigate("Collection");
          }}
        >
          <Ionicons name="shirt-outline" size={width * 0.05} color="#FF69B4" />
          <Text style={styles.menuText}>Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            onClose();
            navigation.navigate("Wishlist");
          }}
        >
          <Ionicons name="heart-outline" size={width * 0.05} color="#FF69B4" />
          <Text style={styles.menuText}>Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            onClose();
            navigation.navigate("Cart");
          }}
        >
          <Ionicons name="cart-outline" size={width * 0.05} color="#FF69B4" />
          <Text style={styles.menuText}>My Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            onClose();
            navigation.navigate("Orders");
          }}
        >
          <Ionicons
            name="receipt-outline"
            size={width * 0.05}
            color="#FF69B4"
          />
          <Text style={styles.menuText}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            onClose();
            navigation.navigate("Profile");
          }}
        >
          <Ionicons name="person-outline" size={width * 0.05} color="#FF69B4" />
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: height,
    width: width * 0.7,
    backgroundColor: "#fbeaea",
    paddingTop: height * 0.08,
    paddingHorizontal: width * 0.05,
    zIndex: 2,
    elevation: 5,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  content: {
    flex: 1,
    paddingTop: height * 0.02,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginBottom: height * 0.02,
    fontFamily: "Prata-Regular",
    color: "#FF69B4",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.015,
  },
  menuText: {
    fontSize: width * 0.045,
    fontFamily: "Outfit-Regular",
    color: "#555",
    marginLeft: width * 0.04,
  },
});

export default Sidebar;
