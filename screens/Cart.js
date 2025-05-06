import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ShopContext } from "../context/ShopContext";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  const {
    products,
    cartItems,
    currency,
    updateQuantity,
    getCartAmount,
    deliveryCharge,
    totalAmount,
    token,
  } = useContext(ShopContext);

  const navigation = useNavigation();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
      setLoading(false);
    }
  }, [cartItems, products]);

  const handleCheckout = () => {
    if (getCartAmount() === 0) {
      navigation.navigate("Collection");
    } else if (!token) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("PlaceOrder");
    }
  };

  const renderCartItem = ({ item }) => {
    const productData = products.find((p) => p._id === item._id);
    if (!productData) return null;

    return (
      <View style={styles.cartItem}>
        <View style={styles.leftSection}>
          <Image
            source={{ uri: productData.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.detail}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {productData.name}
            </Text>
            <Text style={styles.price}>
              {currency} {productData.price.toFixed(2)}
            </Text>
            <View style={styles.sizeContainer}>
              <MaterialCommunityIcons
                name="tag-outline"
                size={14}
                color="#E75480"
              />
              <Text style={styles.size}>Size: {item.size}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightSection}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => {
                const newQty = Math.max(1, item.quantity - 1);
                updateQuantity(item._id, item.size, newQty);
              }}
              style={styles.quantityBtn}
            >
              <MaterialIcons name="remove" size={18} color="#E75480" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={item.quantity.toString()}
              editable={false}
              onChangeText={(value) => {
                const qty = Number(value);
                if (qty > 0) {
                  updateQuantity(item._id, item.size, qty);
                }
              }}
            />
            <TouchableOpacity
              onPress={() => {
                updateQuantity(item._id, item.size, item.quantity + 1);
              }}
              style={styles.quantityBtn}
            >
              <MaterialIcons name="add" size={18} color="#E75480" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => updateQuantity(item._id, item.size, 0)}
            style={styles.removeBtn}
          >
            <MaterialIcons name="delete-outline" size={22} color="#E75480" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#E75480" style={styles.loader} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Shopping Bag</Text>
        {cartData.length > 0 && (
          <View style={styles.cartCount}>
            <Text style={styles.cartCountText}>{cartData.length}</Text>
          </View>
        )}
      </View>

      {cartData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="cart-remove"
            size={80}
            color="#F8C8DC"
          />
          <Text style={styles.emptyText}>Your bag is empty</Text>
          <Text style={styles.emptySubtext}>
            {token
              ? "Discover our latest collections"
              : "Sign in to access your saved items"}
          </Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate(token ? "Collection" : "Login")}
          >
            <Text style={styles.shopButtonText}>
              {token ? "Continue Shopping" : "Sign In"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <FlatList
            data={cartData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderCartItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <TouchableOpacity
              style={styles.arrowBtn}
              onPress={() => setIsSummaryExpanded(!isSummaryExpanded)}
            >
              <MaterialIcons
                name={isSummaryExpanded ? "expand-more" : "expand-less"}
                size={28}
                color="#E75480"
              />
            </TouchableOpacity>
            {isSummaryExpanded && (
              <View style={styles.detailsContainer}>
                <View style={styles.summaryRow}>
                  <Text style={styles.label}>Subtotal</Text>
                  <Text style={styles.value}>
                    {currency} {getCartAmount().toFixed(2)}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.label}>Delivery</Text>
                  <Text style={styles.value}>
                    {currency} {deliveryCharge().toFixed(2)}
                  </Text>
                </View>
                <View style={styles.divider} />
                <View style={[styles.summaryRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>
                    {currency} {totalAmount.toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.checkoutBtn}
                  onPress={handleCheckout}
                >
                  <Text style={styles.checkoutText}>Proceed To Checkout</Text>
                  <MaterialCommunityIcons
                    name="arrow-right"
                    size={22}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  arrowBtn: {
    alignSelf: "flex-end",
    marginBottom: 0,
  },
  detailsContainer: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF9FB",
    paddingHorizontal: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#E75480",
    fontFamily: "Helvetica",
  },
  cartCount: {
    backgroundColor: "#E75480",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  cartCountText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 22,
    color: "#E75480",
    fontWeight: "600",
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 15,
    color: "#888",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  shopButton: {
    marginTop: 30,
    backgroundColor: "#E75480",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: "#E75480",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  shopButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: "column",
    gap: 20,
    marginBottom: 16,
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 14,
    shadowColor: "#E75480",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#FFF0F5",
  },
  leftSection: {
    flexDirection: "row",
    flex: 1,
    marginRight: 12,
  },
  image: {
    width: 80,
    height: 130,
    borderRadius: 10,
    backgroundColor: "#FFF0F5",
  },
  detail: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    maxWidth: "90%",
  },
  price: {
    color: "#E75480",
    fontSize: 16,
    fontWeight: "700",
  },
  sizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF0F5",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 5,
  },
  size: {
    fontSize: 13,
    color: "#E75480",
    fontWeight: "500",
    marginLeft: 5,
  },
  rightSection: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  quantityBtn: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF0F5",
    borderRadius: 8,
  },
  input: {
    width: 42,
    height: 30,
    borderWidth: 1,
    borderColor: "#FFD6E7",
    borderRadius: 8,
    marginHorizontal: 4,
    textAlign: "center",
    backgroundColor: "#FFF",
    fontSize: 15,
    fontWeight: "500",
    color: "#E75480",
  },
  removeBtn: {
    padding: 4,
  },
  summary: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 22,
    shadowColor: "#E75480",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#FFF0F5",
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 18,
    color: "#E75480",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    color: "#888",
  },
  value: {
    fontSize: 15,
    color: "#555",
    fontWeight: "500",
  },
  totalRow: {
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: "#E75480",
  },
  totalValue: {
    fontSize: 17,
    fontWeight: "700",
    color: "#E75480",
  },
  divider: {
    height: 1,
    backgroundColor: "#FFD6E7",
    marginVertical: 14,
  },
  checkoutBtn: {
    marginTop: 20,
    backgroundColor: "#E75480",
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#E75480",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  checkoutText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 17,
    marginRight: 10,
  },
});
