import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CustomToast from "./CustomToast";
import { ShopContext } from "../context/ShopContext";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

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

    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);

    Animated.timing(fadeAnim, {
      toValue: newWishlistState ? 0.3 : 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      fadeAnim.setValue(1);
    });

    toggleWishlist(id).catch(() => {
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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={width * 0.06} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={handleWishlistToggle}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isWishlisted ? "heart" : "heart-outline"}
            size={width * 0.07}
            color={isWishlisted ? "hotpink" : "#333"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.brandName}>RARE FASHION</Text>
          <Text style={styles.productName}>{name}</Text>

          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Ionicons
                  key={i}
                  name="star"
                  size={width * 0.04}
                  color={i < 4 ? "#FFD700" : "#DDD"}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>4.2 (122 Reviews)</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>$ {price}</Text>
            <Text style={styles.originalPrice}>${price + 15}</Text>
            <Text style={styles.discount}>(20% OFF)</Text>
          </View>

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

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PRODUCT DETAILS</Text>
            <Text style={styles.description}>
              {description ||
                "Premium quality product with the best materials."}
            </Text>
          </View>

          <View style={styles.deliveryInfo}>
            <Ionicons name="time-outline" size={width * 0.05} color="#666" />
            <Text style={styles.deliveryText}>
              Delivery within 3-5 business days
            </Text>
          </View>
        </View>
      </ScrollView>

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
    padding: width * 0.04,
    position: "absolute",
    top: height * 0.02,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: width * 0.05,
    padding: width * 0.02,
  },
  wishlistButton: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: width * 0.05,
    padding: width * 0.02,
  },
  imageContainer: {
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height * 0.02,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: height * 0.002 },
    shadowOpacity: 0.1,
    shadowRadius: width * 0.015,
    elevation: 3,
    marginBottom: height * 0.008,
  },
  productImage: {
    width: width * 0.8,
    height: width * 0.8,
  },
  infoContainer: {
    padding: width * 0.05,
    paddingBottom: height * 0.1,
  },
  brandName: {
    fontSize: width * 0.035,
    color: "#666",
    fontWeight: "500",
    marginBottom: height * 0.004,
    letterSpacing: 1,
  },
  productName: {
    fontSize: width * 0.055,
    fontWeight: "600",
    color: "#333",
    marginBottom: height * 0.012,
    lineHeight: width * 0.07,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.016,
  },
  stars: {
    flexDirection: "row",
    marginRight: width * 0.02,
  },
  ratingText: {
    fontSize: width * 0.035,
    color: "#666",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.024,
  },
  currentPrice: {
    fontSize: width * 0.055,
    fontWeight: "700",
    color: "hotpink",
    marginRight: width * 0.02,
  },
  originalPrice: {
    fontSize: width * 0.045,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: width * 0.02,
  },
  discount: {
    fontSize: width * 0.04,
    color: "#4CAF50",
    fontWeight: "600",
  },
  section: {
    marginBottom: height * 0.024,
  },
  sectionTitle: {
    fontSize: width * 0.035,
    fontWeight: "700",
    color: "#333",
    marginBottom: height * 0.012,
    letterSpacing: 0.5,
  },
  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -width * 0.01,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: width * 0.01,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    margin: width * 0.01,
    backgroundColor: "#FFF",
  },
  selectedSize: {
    borderColor: "hotpink",
    backgroundColor: "hotpink",
  },
  sizeText: {
    fontSize: width * 0.035,
    fontWeight: "500",
    color: "#333",
  },
  selectedSizeText: {
    color: "#FFF",
  },
  description: {
    fontSize: width * 0.038,
    lineHeight: width * 0.055,
    color: "#666",
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: width * 0.03,
    backgroundColor: "#F9F9F9",
    borderRadius: width * 0.02,
    marginTop: height * 0.016,
  },
  deliveryText: {
    fontSize: width * 0.035,
    color: "#666",
    marginLeft: width * 0.02,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    padding: width * 0.04,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  addToCartButton: {
    backgroundColor: "hotpink",
    borderRadius: width * 0.02,
    padding: height * 0.016,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#CCC",
  },
  addToCartText: {
    color: "#FFF",
    fontSize: width * 0.04,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default Product;
