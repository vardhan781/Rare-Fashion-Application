import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  Alert,
} from "react-native";
import React, { useRef, useContext, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { ShopContext } from "../context/ShopContext";

const { width } = Dimensions.get("window");
const productWidth = (width - 40) / 2;

const ProductItem = ({
  id,
  name,
  price,
  bestseller,
  image,
  description,
  sizes,
}) => {
  const [fontsLoaded] = useFonts({
    "Prata-Regular": require("../assets/fonts/Prata-Regular.ttf"),
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
  });

  const { toggleWishlist, isInWishlist, token, showToast } =
    useContext(ShopContext);

  const [isFavorite, setIsFavorite] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  // Sync with context state
  useEffect(() => {
    if (id) {
      setIsFavorite(isInWishlist(id));
    }
  }, [id, isInWishlist]);

  const handleFavoriteToggle = () => {
    if (!token) {
      showToast("Please login to manage wishlist", "error");
      return;
    }

    // Optimistic UI update
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    // Animation
    Animated.timing(fadeAnim, {
      toValue: newFavoriteState ? 0.3 : 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      fadeAnim.setValue(1);
    });

    // Toggle wishlist in context
    toggleWishlist(id).catch(() => {
      // Revert if there's an error
      setIsFavorite(!newFavoriteState);
      showToast("Failed to update wishlist", "error");
    });
  };

  if (!fontsLoaded || !id) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() =>
        navigation.navigate("Product", {
          id,
          name,
          price,
          image,
          description,
          sizes,
        })
      }
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.productImage} />
        {bestseller && (
          <View style={styles.bestsellerSticker}>
            <Text style={styles.bestsellerText}>Bestseller</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={handleFavoriteToggle}
          activeOpacity={0.7}
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={28}
              color={isFavorite ? "hotpink" : "#fff"}
              style={styles.heartIcon}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
      <View style={styles.nameandprice}>
        <Text style={styles.productName} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.wishbutton}>
          <Text style={styles.productPrice}>${price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: "#fff",
    elevation: 3,
    width: productWidth,
    marginTop: 20,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 280,
    resizeMode: "cover",
  },
  productName: {
    fontSize: 14,
    fontFamily: "Outfit-Regular",
    textAlign: "left",
    marginTop: 8,
    paddingHorizontal: 8,
  },
  productPrice: {
    fontSize: 17,
    color: "hotpink",
    fontWeight: "bold",
  },
  bestsellerSticker: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "gold",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  bestsellerText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  nameandprice: {
    minHeight: 120,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  wishbutton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  wishlistButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "transparent",
    borderRadius: 20,
    padding: 5,
  },
  heartIcon: {
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
