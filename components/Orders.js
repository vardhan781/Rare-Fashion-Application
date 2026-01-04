import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Orders = () => {
  const { currency, serverUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const loadOrderData = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }
      const response = await axios.post(
        serverUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadOrderData();
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "order placed":
        return "#fcbf49";
      case "packing":
        return "#f77f00";
      case "shipped":
        return "#219ebc";
      case "out for delivery":
        return "#9b5de5";
      case "delivered":
        return "#4CAF50";
      default:
        return "#999";
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size="large"
            color="#FF3E6C"
            style={styles.loadingSpinner}
          />
          <Text style={styles.loadingText}>Loading your orders...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={width * 0.06} color="#FF3E6C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Orders</Text>
          <View style={{ width: width * 0.06 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FF3E6C"
            />
          }
        >
          {orderData.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="archive-outline"
                size={width * 0.2}
                style={styles.emptyImage}
              />
              <Text style={styles.emptyTitle}>No Orders Yet</Text>
              <Text style={styles.emptyText}>
                Your beautiful purchases will appear here
              </Text>
              <TouchableOpacity style={styles.shopButton}>
                <Text style={styles.shopButtonText}>Start Shopping</Text>
              </TouchableOpacity>
            </View>
          ) : (
            orderData.map((item, index) => (
              <View style={styles.card} key={index}>
                <View style={styles.cardHeader}>
                  <View style={styles.orderDateContainer}>
                    <Ionicons
                      name="calendar-outline"
                      size={width * 0.04}
                      color="#FF3E6C"
                    />
                    <Text style={styles.orderDate}>
                      {new Date(item.date).toDateString()}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusContainer,
                      { backgroundColor: `${getStatusColor(item.status)}20` },
                    ]}
                  >
                    <View
                      style={[
                        styles.statusDot,
                        { backgroundColor: getStatusColor(item.status) },
                      ]}
                    />
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>

                <View style={styles.orderBody}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                  />
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.name}</Text>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailText}>
                        {currency} {item.price.toFixed(2)}
                      </Text>
                      <Text style={styles.detailText}>·</Text>
                      <Text style={styles.detailText}>
                        Qty: {item.quantity}
                      </Text>
                      <Text style={styles.detailText}>·</Text>
                      <Text style={styles.detailText}>Size: {item.size}</Text>
                    </View>

                    <View style={styles.paymentMethodContainer}>
                      <Ionicons
                        name="wallet-outline"
                        size={width * 0.04}
                        color="#FF3E6C"
                      />
                      <Text style={styles.paymentMethod}>
                        {item.paymentMethod}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Reorder</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.trackButton]}
                    onPress={loadOrderData}
                  >
                    <Text
                      style={[styles.actionButtonText, { color: "#FF3E6C" }]}
                    >
                      Track Order
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF9FB",
  },
  backButton: {
    position: "absolute",
    top: height * 0.04,
    left: width * 0.04,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: width * 0.05,
    padding: width * 0.02,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF9FB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: width * 0.05,
    paddingTop: height * 0.02,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#FFD6E0",
  },
  headerTitle: {
    fontSize: width * 0.06,
    fontWeight: "600",
    color: "#FF3E6C",
    fontFamily: "PlayfairDisplay_600SemiBold",
  },
  scrollContainer: {
    paddingHorizontal: width * 0.04,
    paddingBottom: height * 0.03,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: height * 0.1,
  },
  emptyTitle: {
    fontSize: width * 0.05,
    fontWeight: "600",
    color: "#FF3E6C",
    marginBottom: height * 0.008,
    fontFamily: "PlayfairDisplay_600SemiBold",
  },
  emptyText: {
    fontSize: width * 0.035,
    color: "#888",
    textAlign: "center",
    marginBottom: height * 0.025,
    fontFamily: "Lato_400Regular",
  },
  shopButton: {
    backgroundColor: "#FF3E6C",
    paddingVertical: height * 0.014,
    paddingHorizontal: width * 0.1,
    borderRadius: width * 0.06,
  },
  shopButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: width * 0.04,
    fontFamily: "Lato_600SemiBold",
  },
  card: {
    backgroundColor: "white",
    borderRadius: width * 0.045,
    padding: width * 0.045,
    marginBottom: height * 0.016,
    shadowColor: "#FF3E6C",
    shadowOffset: { width: 0, height: height * 0.004 },
    shadowOpacity: 0.1,
    shadowRadius: width * 0.04,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: height * 0.012,
    borderBottomWidth: 1,
    borderBottomColor: "#FFF0F5",
  },
  orderDateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderDate: {
    fontSize: width * 0.032,
    color: "#666",
    marginLeft: width * 0.015,
    fontFamily: "Lato_400Regular",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.025,
    paddingVertical: height * 0.004,
    borderRadius: width * 0.03,
  },
  statusDot: {
    width: width * 0.02,
    height: width * 0.02,
    borderRadius: width * 0.01,
    marginRight: width * 0.015,
  },
  statusText: {
    fontSize: width * 0.032,
    fontWeight: "600",
    textTransform: "capitalize",
    fontFamily: "Lato_600SemiBold",
  },
  orderBody: {
    flexDirection: "row",
    paddingVertical: height * 0.015,
  },
  productImage: {
    width: width * 0.2,
    height: width * 0.325,
    borderRadius: width * 0.025,
    borderWidth: 1,
    borderColor: "#FFE5EC",
  },
  productDetails: {
    flex: 1,
    marginLeft: width * 0.04,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: width * 0.04,
    color: "#333",
    marginBottom: height * 0.006,
    fontFamily: "Lato_600SemiBold",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.008,
  },
  detailText: {
    fontSize: width * 0.032,
    color: "#666",
    marginRight: width * 0.02,
    fontFamily: "Lato_400Regular",
  },
  paymentMethodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.005,
  },
  paymentMethod: {
    fontSize: width * 0.032,
    color: "#666",
    marginLeft: width * 0.015,
    fontFamily: "Lato_400Regular",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: height * 0.01,
    borderTopWidth: 1,
    borderTopColor: "#FFF0F5",
  },
  actionButton: {
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.04,
    borderWidth: 1,
    borderColor: "#FFD6E0",
  },
  trackButton: {
    backgroundColor: "white",
  },
  actionButtonText: {
    fontSize: width * 0.032,
    fontWeight: "600",
    fontFamily: "Lato_600SemiBold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF9FB",
  },
  loadingSpinner: {
    transform: [{ scale: 1.1 }],
  },
  loadingText: {
    marginTop: height * 0.02,
    color: "#FF3E6C",
    fontSize: width * 0.035,
    fontFamily: "Lato_600SemiBold",
  },
});

export default Orders;
