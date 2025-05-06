import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Animated,
  Easing,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CustomToast from "./CustomToast";
import { ShopContext } from "../context/ShopContext";

const { width } = Dimensions.get("window");

const Product = () => {
  const route = useRoute();
  const { id, name, price, image, description, sizes = [] } = route.params;
  const { addToCart, token, toggleWishlist, isInWishlist } =
    useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [toastConfig, setToastConfig] = useState({
    visible: false,
    type: "success",
    message: "",
  });

  const showToast = (message, type = "success") => {
    setToastConfig({
      visible: true,
      type,
      message,
    });

    // Auto-hide after 2.5 seconds
    setTimeout(() => {
      setToastConfig((prev) => ({ ...prev, visible: false }));
    }, 2500);
  };

  useEffect(() => {
    if (id) {
      setIsWishlisted(isInWishlist(id));
    }
  }, [id, isInWishlist]);

  const handleWishlistToggle = () => {
    if (!token) {
      showToast("Please login to manage wishlist", "error");
      return;
    }

    // Optimistic UI update
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);

    // Animation
    Animated.timing(fadeAnim, {
      toValue: newWishlistState ? 0.3 : 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      fadeAnim.setValue(1);
    });

    // Toggle wishlist in context
    toggleWishlist(id).catch(() => {
      // Revert if there's an error
      setIsWishlisted(!newWishlistState);
      showToast("Failed to update wishlist", "error");
    });
  };

  const handleAddToCart = async () => {
    if (!token) {
      showToast("Please Login To Add The Product", "error");
      return;
    }
    try {
      await addToCart(id, selectedSize);
      showToast("Product added to cart");
    } catch (error) {
      showToast(error.message || "Failed to add to cart", "error");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button and wishlist */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={handleWishlistToggle}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isWishlisted ? "heart" : "heart-outline"}
            size={28}
            color={isWishlisted ? "hotpink" : "#333"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image with shadow effect */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.brandName}>RARE FASHION</Text>
          <Text style={styles.productName}>{name}</Text>

          {/* Rating and Reviews */}
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Ionicons
                  key={i}
                  name="star"
                  size={16}
                  color={i < 4 ? "#FFD700" : "#DDD"}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>4.2 (122 Reviews)</Text>
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>$ {price}</Text>
            <Text style={styles.originalPrice}>${price + 15}</Text>
            <Text style={styles.discount}>(20% OFF)</Text>
          </View>

          {/* Size Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SELECT SIZE</Text>
            <View style={styles.sizeContainer}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.selectedSize,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.selectedSizeText,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Product Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PRODUCT DETAILS</Text>
            <Text style={styles.description}>
              {description ||
                "Premium quality product with the best materials."}
            </Text>
          </View>

          {/* Delivery Info */}
          <View style={styles.deliveryInfo}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.deliveryText}>
              Delivery within 3-5 business days
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Add to Cart Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            !selectedSize && styles.disabledButton,
          ]}
          disabled={!selectedSize}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>
            {selectedSize ? "ADD TO CART" : "SELECT SIZE"}
          </Text>
        </TouchableOpacity>
      </View>
      <CustomToast
        visible={toastConfig.visible}
        type={toastConfig.type}
        message={toastConfig.message}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    padding: 8,
    paddingTop: 50,
  },
  wishlistButton: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    padding: 8,
    paddingTop: 50,
  },
  imageContainer: {
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 8,
  },
  productImage: {
    width: width * 0.8,
    height: width * 0.8,
  },
  infoContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  brandName: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
    marginBottom: 4,
    letterSpacing: 1,
  },
  productName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    lineHeight: 28,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  stars: {
    flexDirection: "row",
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  currentPrice: {
    fontSize: 22,
    fontWeight: "700",
    color: "hotpink",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 18,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  discount: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 4,
    backgroundColor: "#FFF",
  },
  selectedSize: {
    borderColor: "hotpink",
    backgroundColor: "hotpink",
  },
  sizeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  selectedSizeText: {
    color: "#FFF",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#666",
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    marginTop: 16,
  },
  deliveryText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  addToCartButton: {
    backgroundColor: "hotpink",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#CCC",
  },
  addToCartText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default Product;
