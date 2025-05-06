import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

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
                size={20}
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
      <View style={styles.container}>
        <Text style={styles.header}>My Wishlist</Text>

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
            <Ionicons name="heart-dislike" size={60} color="#ffd6de" />
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fffafb",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontFamily: "Prata-Regular",
    color: "#333",
    marginVertical: 16,
    marginLeft: 4,
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: "#ff5a78",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
  },
  productImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  badgeContainer: {
    position: "absolute",
    bottom: 8,
    left: 8,
  },
  bestsellerBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#ff5a78",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 15,
    fontFamily: "Outfit-Regular",
    color: "#333",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: "Outfit-Regular",
    color: "#ff5a78",
    fontWeight: "600",
    marginBottom: 8,
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    color: "#888",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: "Prata-Regular",
    color: "#333",
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 8,
    maxWidth: "80%",
  },
  loginButton: {
    backgroundColor: "#ff5a78",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default Wishlist;
