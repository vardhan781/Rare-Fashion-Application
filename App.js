import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ShopContextProvider from "./context/ShopContext";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox, View, Text } from "react-native";

import Home from "./screens/Home";
import Collection from "./screens/Collection";
import Cart from "./screens/Cart";
import Profile from "./screens/Profile";
import Login from "./components/Login";
import Otp from "./components/Otp";
import Product from "./components/Product";
import PlaceOrder from "./components/PlaceOrder";
import Orders from "./components/Orders";
import Wishlist from "./components/Wishlist";
import Terms from "./components/Terms";
import Contact from "./components/Contact";
import About from "./components/About";
import Privacy from "./components/Privacy";

LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Collection") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "bag" : "bag-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }
          return <Ionicons name={iconName} size={28} color={color} />;
        },
        tabBarActiveTintColor: "hotpink",
        tabBarInactiveTintColor: "gray",
        tabBarStyle:
          route.name === "Collection"
            ? { display: "none" }
            : { backgroundColor: "#FFE0E0" },
        headerShown: false,
        tabBarShowLabel: true,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Collection" component={Collection} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  try {
    return (
      <ShopContextProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Main"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Main" component={MainTabs} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Otp" component={Otp} />
              <Stack.Screen name="Product" component={Product} />
              <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
              <Stack.Screen name="Orders" component={Orders} />
              <Stack.Screen name="Wishlist" component={Wishlist} />
              <Stack.Screen name="Terms" component={Terms} />
              <Stack.Screen name="Contact" component={Contact} />
              <Stack.Screen name="About" component={About} />
              <Stack.Screen name="Privacy" component={Privacy} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ShopContextProvider>
    );
  } catch (error) {
    console.error("App rendering failed:", error);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", fontSize: 18 }}>Something went wrong</Text>
      </View>
    );
  }
}
