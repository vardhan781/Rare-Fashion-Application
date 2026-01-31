import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { useRef, useContext, useState, useEffect } from "react";
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
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

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

    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    Animated.timing(fadeAnim, {
      toValue: newFavoriteState ? 0.3 : 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      fadeAnim.setValue(1);
    });

    toggleWishlist(id).catch(() => {
      setIsFavorite(!newFavoriteState);
      showToast("Failed to update wishlist", "error");
    });
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  if (!fontsLoaded || !id) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.productContainer, { width: productWidth }]}
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
        {!imageError ? (
          <>
            <Image
              source={{ uri: image }}
              style={styles.productImage}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            {imageLoading && (
              <View style={styles.imageLoadingOverlay}>
                <Ionicons name="sparkles" size={24} color="hotpink" />
              </View>
            )}
          </>
        ) : (
          <View style={[styles.productImage, styles.fallbackContainer]}>
            <View style={styles.fallbackContent}>
              <Text style={styles.fallbackBrand}>RARE</Text>
              <Text style={styles.fallbackBrand}>FASHION</Text>

              <View style={styles.sparkleRow}>
                <Ionicons
                  name="sparkles"
                  size={16}
                  color="rgba(255,255,255,0.7)"
                />
                <Ionicons
                  name="sparkles"
                  size={16}
                  color="rgba(255,255,255,0.7)"
                />
                <Ionicons
                  name="sparkles"
                  size={16}
                  color="rgba(255,255,255,0.7)"
                />
              </View>
            </View>
          </View>
        )}
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
              size={width * 0.07}
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
    marginTop: width * 0.05,
    overflow: "hidden",
    borderRadius: width * 0.02,
    marginHorizontal: width * 0.01,
  },
  imageContainer: {
    position: "relative",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: width * 0.7,
    resizeMode: "cover",
    backgroundColor: "#fbeaea",
  },
  fallbackContainer: {
    backgroundColor: "#FF69B4",
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackContent: {
    alignItems: "center",
    padding: 20,
  },
  fallbackBrand: {
    fontFamily: "Prata-Regular",
    fontSize: 22,
    color: "white",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  sparkleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 6,
  },
  imageLoadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(251, 234, 234, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  productName: {
    fontSize: width * 0.035,
    fontFamily: "Outfit-Regular",
    textAlign: "left",
    marginTop: width * 0.02,
    paddingHorizontal: width * 0.02,
    lineHeight: width * 0.045,
    minHeight: width * 0.09,
  },
  productPrice: {
    fontSize: width * 0.042,
    color: "hotpink",
    fontWeight: "bold",
  },
  bestsellerSticker: {
    position: "absolute",
    bottom: width * 0.025,
    right: width * 0.025,
    backgroundColor: "gold",
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.02,
    borderRadius: width * 0.025,
  },
  bestsellerText: {
    fontSize: width * 0.03,
    fontWeight: "bold",
  },
  nameandprice: {
    minHeight: width * 0.3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  wishbutton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.02,
    paddingVertical: width * 0.025,
  },
  wishlistButton: {
    position: "absolute",
    top: width * 0.025,
    right: width * 0.025,
    backgroundColor: "transparent",
    borderRadius: width * 0.05,
    padding: width * 0.012,
  },
  heartIcon: {
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: width * 0.002 },
    textShadowRadius: width * 0.005,
  },
});
