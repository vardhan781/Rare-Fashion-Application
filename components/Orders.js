import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { Ionicons } from "@expo/vector-icons";

const Orders = () => {
  const { currency, serverUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color="#FF3E6C"
          style={styles.loadingSpinner}
        />
        <Text style={styles.loadingText}>Loading your orders...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
        <Ionicons name="heart-outline" size={24} color="#FF3E6C" />
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
              size={80}
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
              {/* Order Header */}
              <View style={styles.cardHeader}>
                <View style={styles.orderDateContainer}>
                  <Ionicons name="calendar-outline" size={16} color="#FF3E6C" />
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

              {/* Order Body */}
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
                    <Text style={styles.detailText}>Qty: {item.quantity}</Text>
                    <Text style={styles.detailText}>·</Text>
                    <Text style={styles.detailText}>Size: {item.size}</Text>
                  </View>

                  <View style={styles.paymentMethodContainer}>
                    <Ionicons name="wallet-outline" size={16} color="#FF3E6C" />
                    <Text style={styles.paymentMethod}>
                      {item.paymentMethod}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Order Footer */}
              <View style={styles.cardFooter}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Reorder</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.trackButton]}
                  onPress={loadOrderData}
                >
                  <Text style={[styles.actionButtonText, { color: "#FF3E6C" }]}>
                    Track Order
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9FB", // Soft pink background
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#FFD6E0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FF3E6C",
    fontFamily: "PlayfairDisplay_600SemiBold",
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FF3E6C",
    marginBottom: 8,
    fontFamily: "PlayfairDisplay_600SemiBold",
  },
  emptyText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 25,
    fontFamily: "Lato_400Regular",
  },
  shopButton: {
    backgroundColor: "#FF3E6C",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  shopButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Lato_600SemiBold",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#FF3E6C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#FFF0F5",
  },
  orderDateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderDate: {
    fontSize: 13,
    color: "#666",
    marginLeft: 6,
    fontFamily: "Lato_400Regular",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "capitalize",
    fontFamily: "Lato_600SemiBold",
  },
  orderBody: {
    flexDirection: "row",
    paddingVertical: 15,
  },
  productImage: {
    width: 80,
    height: 130,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFE5EC",
  },
  productDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
    fontFamily: "Lato_600SemiBold",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 13,
    color: "#666",
    marginRight: 8,
    fontFamily: "Lato_400Regular",
  },
  paymentMethodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  paymentMethod: {
    fontSize: 13,
    color: "#666",
    marginLeft: 6,
    fontFamily: "Lato_400Regular",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#FFF0F5",
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#FFD6E0",
  },
  trackButton: {
    backgroundColor: "white",
  },
  actionButtonText: {
    fontSize: 13,
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
    marginTop: 20,
    color: "#FF3E6C",
    fontSize: 14,
    fontFamily: "Lato_600SemiBold",
  },
});

export default Orders;
