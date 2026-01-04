import { createContext, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomToast from "../components/CustomToast";
import Constants from "expo-constants";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const serverUrl = Constants.expoConfig.extra.backendUrl;

  const delivery_fee = 10;
  const currency = "$";
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);
  const [category, setCategory] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState([]);

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

  const loadWishlistFromStorage = async () => {
    try {
      const savedWishlist = await AsyncStorage.getItem("wishlist");
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
    }
  };

  const loadCartFromStorage = async () => {
    try {
      const savedCart = await AsyncStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart from storage:", error);
    }
  };

  const persistCart = async (cart) => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error persisting cart:", error);
    }
  };

  const persistWishlist = async (wishlist) => {
    try {
      await AsyncStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  };

  const toggleWishlist = async (itemId) => {
    if (!token) {
      showToast("Please login to manage wishlist", "error");
      throw new Error("Not authenticated");
    }

    try {
      let updatedWishlist = [...wishlistItems];
      if (updatedWishlist.includes(itemId)) {
        updatedWishlist = updatedWishlist.filter((id) => id !== itemId);
        showToast("Removed from wishlist");
      } else {
        updatedWishlist.push(itemId);
        showToast("Added to wishlist");
      }

      setWishlistItems(updatedWishlist);
      await persistWishlist(updatedWishlist);
      return true;
    } catch (error) {
      console.error("Wishlist error:", error);
      showToast("Failed to update wishlist", "error");
      throw error;
    }
  };
  const isInWishlist = (itemId) => {
    return wishlistItems.includes(itemId);
  };

  const addToCart = async (itemId, size) => {
    if (!token) {
      showToast("Please login to add items to your cart", "error");
      return;
    }

    let cartData = JSON.parse(JSON.stringify(cartItems));

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    await persistCart(cartData);
    showToast("Product added to cart");

    if (token) {
      try {
        await axios.post(
          `${serverUrl}/api/cart/add`,
          { itemId, size },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
        showToast(error.message || "Failed to update cart", "error");
      }
    }
  };

  const loadToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Error loading token:", error);
    }
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/product/list`);

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        console.error("API Error:", response.data.message);
        showToast("Failed to load products", "error");
      }
    } catch (error) {
      console.error("Network Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      showToast("Error fetching products", "error");
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = JSON.parse(JSON.stringify(cartItems));

    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    await persistCart(cartData);

    if (token) {
      try {
        await axios.post(
          `${serverUrl}/api/cart/update`,
          { itemId, size, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
        showToast(error.message || "Failed to update quantity", "error");
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    const productsMap = {};
    products.forEach((product) => {
      productsMap[product._id] = product;
    });

    for (const productId in cartItems) {
      const product = productsMap[productId];

      if (!product || !product.price) {
        continue;
      }

      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];

        if (quantity > 0) {
          totalAmount += product.price * quantity;
        }
      }
    }

    return totalAmount;
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/cart/get`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
      showToast(error.message || "Failed to load cart", "error");
    }
  };

  const logout = async () => {
    try {
      setToken(null);
      setCartItems({});
      setWishlistItems([]);
      await AsyncStorage.removeItem("cart");
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("wishlist");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleCategory = (categoryValue) => {
    setCategory((prevCategories) => {
      const value =
        typeof categoryValue === "object" && categoryValue.target
          ? categoryValue.target.value
          : categoryValue;

      if (prevCategories.includes(value)) {
        return prevCategories.filter((item) => item !== value);
      } else {
        return [...prevCategories, value];
      }
    });
  };

  useEffect(() => {
    const initializeApp = async () => {
      await getProductData();
      const loadedToken = await loadToken();
      await loadCartFromStorage();
      await loadWishlistFromStorage();

      if (loadedToken) {
        await getUserCart(loadedToken);
      }
    };
    initializeApp();
  }, []);

  const deliveryCharge = () => {
    const amount = getCartAmount();
    return amount < 120 && amount > 0 ? delivery_fee : 0;
  };

  const totalAmount = getCartAmount() + deliveryCharge();

  const value = {
    delivery_fee,
    products,
    currency,
    category,
    setCategory,
    toggleCategory,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartAmount,
    serverUrl,
    setToken,
    token,
    logout,
    deliveryCharge,
    totalAmount,
    wishlistItems,
    toggleWishlist,
    isInWishlist,
    showToast,
  };

  return (
    <>
      <ShopContext.Provider value={value}>
        {props.children}
      </ShopContext.Provider>
      <CustomToast
        visible={toastConfig.visible}
        type={toastConfig.type}
        message={toastConfig.message}
      />
    </>
  );
};

export default ShopContextProvider;
