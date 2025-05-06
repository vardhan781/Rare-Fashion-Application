import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ShopContext } from "../context/ShopContext";
import CustomToast from "./CustomToast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PlaceOrder = () => {
  const {
    getCartAmount,
    currency,
    deliveryCharge,
    serverUrl,
    token,
    cartItems,
    setCartItems,
    products,
  } = useContext(ShopContext);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const navigation = useNavigation();
  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (name, value) => {
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async () => {
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = JSON.parse(
              JSON.stringify(products.find((product) => product._id === items))
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryCharge(),
      };

      const response = await axios.post(
        serverUrl + "/api/order/place",
        orderData,
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        await AsyncStorage.removeItem("cart");
        showToast("Success", "Order placed successfully", "success");
        navigation.navigate("Main");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message || "Something went wrong");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.deliveryInfo}>
          <Text style={styles.sectionTitle}>Delivery Information</Text>

          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(text) => onChangeHandler("firstName", text)}
              placeholderTextColor={"#a4a4a4"}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(text) => onChangeHandler("lastName", text)}
              placeholderTextColor={"#a4a4a4"}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Email address"
            value={formData.email}
            onChangeText={(text) => onChangeHandler("email", text)}
            keyboardType="email-address"
            placeholderTextColor={"#a4a4a4"}
          />

          <TextInput
            style={styles.input}
            placeholder="Street"
            value={formData.street}
            onChangeText={(text) => onChangeHandler("street", text)}
            placeholderTextColor={"#a4a4a4"}
          />

          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="City"
              value={formData.city}
              onChangeText={(text) => onChangeHandler("city", text)}
              placeholderTextColor={"#a4a4a4"}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="State"
              value={formData.state}
              onChangeText={(text) => onChangeHandler("state", text)}
              placeholderTextColor={"#a4a4a4"}
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Zip Code"
              value={formData.zipcode}
              onChangeText={(text) => onChangeHandler("zipcode", text)}
              keyboardType="numeric"
              placeholderTextColor={"#a4a4a4"}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Country"
              value={formData.country}
              onChangeText={(text) => onChangeHandler("country", text)}
              placeholderTextColor={"#a4a4a4"}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={formData.phone}
            onChangeText={(text) => onChangeHandler("phone", text)}
            keyboardType="phone-pad"
            returnKeyType="done"
            placeholderTextColor={"#a4a4a4"}
          />
        </View>

        <View style={styles.orderSummary}>
          <Text style={styles.sectionTitle}>🛍️ Order Summary</Text>

          <View style={styles.amountDetail}>
            <View style={styles.amountRow}>
              <Text>Subtotal</Text>
              <Text>
                {getCartAmount()}.00 {currency}
              </Text>
            </View>
            <View style={styles.amountRow}>
              <Text>Delivery Charges</Text>
              <Text>
                {deliveryCharge()}.00 {currency}
              </Text>
            </View>
            <View style={[styles.amountRow, styles.totalRow]}>
              <Text style={styles.boldText}>Total</Text>
              <Text style={styles.boldText}>
                {(getCartAmount() + deliveryCharge()).toFixed(2)} {currency}
              </Text>
            </View>
          </View>

          <View style={styles.paymentOption}>
            <Text style={styles.paymentTitle}>Payment Method</Text>
            <View style={styles.paymentMethod}>
              <View style={styles.paymentSelection}>
                <View style={[styles.optionSelection, styles.selectedOption]} />
                <Text style={styles.paymentMethodText}>
                  Cash on Delivery (COD)
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={onSubmitHandler}
          >
            <Text style={styles.placeOrderButtonText}>Place My Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomToast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffeef2",
  },
  container: {
    padding: 16,
    backgroundColor: "#ffeef2",
  },
  deliveryInfo: {
    backgroundColor: "#fff0f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderColor: "#ffc0cb",
    borderWidth: 1,
  },
  orderSummary: {
    backgroundColor: "#fff0f5",
    borderRadius: 12,
    padding: 16,
    borderColor: "#ffc0cb",
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#d63384",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffc0cb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  amountDetail: {
    marginVertical: 16,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  boldText: {
    fontWeight: "bold",
    color: "#d63384",
  },
  paymentOption: {
    marginTop: 16,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#c2185b",
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  paymentSelection: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionSelection: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#c2185b",
    marginRight: 10,
  },
  selectedOption: {
    backgroundColor: "#f48fb1",
    borderColor: "#f06292",
  },
  paymentMethodText: {
    fontSize: 16,
    color: "#6a1b9a",
  },
  placeOrderButton: {
    backgroundColor: "#d63384",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
  },
  placeOrderButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PlaceOrder;
