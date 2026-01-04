import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const Wishlist = ({ navigation }) => {
  const {
    products = [],
    wishlistItems = [],
    toggleWishlist,
    isInWishlist,
    addToCart,
    currency = "$",
    token,
  } = useContext(ShopContext);

  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0 && wishlistItems.length > 0) {
      const wishlistProducts = products.filter((product) =>
        wishlistItems.includes(product._id)
      );
      setFilteredProducts(wishlistProducts);
    } else {
      setFilteredProducts([]);
    }
    setIsLoading(false);
  }, [products, wishlistItems]);

  const renderItem = ({ item }) => {
    if (!item || !item._id) return null;

    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Product", { productId: item._id })
          }
          style={styles.imageContainer}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <View style={styles.badgeContainer}>
            {item.bestseller && (
              <View style={styles.bestsellerBadge}>
                <Text style={styles.badgeText}>Bestseller</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.detailsContainer}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.productPrice}>
            {currency} {item.price.toFixed(2)}
          </Text>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              onPress={() => toggleWishlist(item._id)}
              style={styles.wishlistButton}
            >
              <Ionicons
                name={isInWishlist(item._id) ? "trash" : "heart-outline"}
                size={width * 0.05}
                color={isInWishlist(item._id) ? "#ff5a78" : "#888"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Product", {
                  id: item._id,
                  name: item.name,
                  price: item.price,
                  image: item.image,
                  description: item.description,
                  sizes: item.sizes,
                })
              }
              style={styles.cartButton}
            >
              <Text style={styles.cartButtonText}>Checkout Product</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff5a78" />
          <Text style={styles.loadingText}>Loading your favorites...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={width * 0.06} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>My Wishlist</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike" size={width * 0.15} color="#ffd6de" />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySubtitle}>
            {token
              ? "Tap the heart icon to save items"
              : "Sign in to view your saved items"}
          </Text>
          {!token && (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
    backgroundColor: "#fffafb",
  },
  backButton: {
    padding: width * 0.02,
  },
  header: {
    fontSize: width * 0.06,
    fontFamily: "Prata-Regular",
    color: "#333",
  },
  headerPlaceholder: {
    width: width * 0.08,
  },
  container: {
    flex: 1,
    backgroundColor: "#fffafb",
    paddingHorizontal: width * 0.04,
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: width * 0.03,
    marginBottom: height * 0.012,
    padding: width * 0.03,
    marginHorizontal: width * 0.04,
    shadowColor: "#ff5a78",
    shadowOffset: { width: 0, height: height * 0.002 },
    shadowOpacity: 0.1,
    shadowRadius: width * 0.015,
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
  },
  productImage: {
    width: width * 0.25,
    height: width * 0.375,
    borderRadius: width * 0.02,
  },
  badgeContainer: {
    position: "absolute",
    bottom: width * 0.02,
    left: width * 0.02,
  },
  bestsellerBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.004,
    borderRadius: width * 0.01,
  },
  badgeText: {
    fontSize: width * 0.025,
    fontWeight: "600",
    color: "#ff5a78",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: width * 0.03,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: width * 0.04,
    fontFamily: "Outfit-Regular",
    color: "#333",
    marginBottom: height * 0.004,
  },
  productPrice: {
    fontSize: width * 0.04,
    fontFamily: "Outfit-Regular",
    color: "#ff5a78",
    fontWeight: "600",
    marginBottom: height * 0.008,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wishlistButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartButton: {
    backgroundColor: "#ff5a78",
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.008,
    borderRadius: width * 0.015,
  },
  cartButtonText: {
    color: "#fff",
    fontSize: width * 0.033,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: height * 0.016,
    color: "#888",
    fontSize: width * 0.04,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.1,
  },
  emptyTitle: {
    fontSize: width * 0.05,
    fontFamily: "Prata-Regular",
    color: "#333",
    marginTop: height * 0.016,
  },
  emptySubtitle: {
    fontSize: width * 0.035,
    color: "#888",
    textAlign: "center",
    marginTop: height * 0.008,
    maxWidth: "80%",
  },
  loginButton: {
    backgroundColor: "#ff5a78",
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.01,
    borderRadius: width * 0.05,
    marginTop: height * 0.016,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: width * 0.035,
  },
  listContent: {
    paddingBottom: height * 0.02,
  },
});

export default Wishlist;
