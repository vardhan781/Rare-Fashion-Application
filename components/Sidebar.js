import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.header}>Rare Fashion</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            onClose();
            navigation.navigate("Home");
          }}
        >
          <Ionicons name="home-outline" size={20} color="#FF69B4" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            onClose();
            navigation.navigate("Collection");
          }}
        >
          <Ionicons name="shirt-outline" size={20} color="#FF69B4" />
          <Text style={styles.menuText}>Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            onClose();
            navigation.navigate("Wishlist");
          }}
        >
          <Ionicons name="heart-outline" size={20} color="#FF69B4" />
          <Text style={styles.menuText}>Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            onClose();
            navigation.navigate("Cart");
          }}
        >
          <Ionicons name="cart-outline" size={20} color="#FF69B4" />
          <Text style={styles.menuText}>My Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            onClose();
            navigation.navigate("Orders");
          }}
        >
          <Ionicons name="receipt-outline" size={20} color="#FF69B4" />
          <Text style={styles.menuText}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            onClose();
            navigation.navigate("Profile");
          }}
        >
          <Ionicons name="person-outline" size={20} color="#FF69B4" />
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
    height: "150%",
    width: "70%",
    backgroundColor: "#fbeaea",
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 2,
    elevation: 5,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 15,
    padding: 10,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Prata-Regular",
    color: "#FF69B4",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 18,
    fontFamily: "Outfit-Regular",
    color: "#555",
    marginLeft: 15,
  },
});

export default Sidebar;
