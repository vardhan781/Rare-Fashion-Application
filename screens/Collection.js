import React, { useContext, useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  Animated,
  Pressable,
} from "react-native";
import { assets } from "../assets/assets";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";
import { useFonts } from "expo-font";
import Fuse from "fuse.js";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from 'react-native-progress';

const Collection = () => {
  const {
    products,
    category,
    toggleCategory,
    toggleWishlist,
    isInWishlist,
  } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilter, setShowFilter] = useState(false);
  const [sortOption, setSortOption] = useState("preference");
  const [search, setSearch] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const windowHeight = Dimensions.get("window").height;
  const searchInputRef = useRef(null);
  const navigation = useNavigation();

  const fuseOptions = {
    keys: ["name", "category", "description", "tag"],
    threshold: 0.4,
    distance: 600,
  };

  const categories = [
    { id: "Casual", name: "Casual" },
    { id: "Denim", name: "Denim" },
    { id: "Formal", name: "Formal" },
    { id: "Dresses", name: "Dresses" },
  ];

  const sortOptions = [
    { id: "high-low", name: "Price: High to Low" },
    { id: "low-high", name: "Price: Low to High" },
    { id: "preference", name: "Preference" },
  ];

  const [fontsLoaded] = useFonts({
    "Prata-Regular": require("../assets/fonts/Prata-Regular.ttf"),
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
  });

  const applyFilter = () => {
    let result = [...products];

    // Apply search filter
    if (search) {
      const fuse = new Fuse(result, fuseOptions);
      const searchResults = fuse.search(search);
      result = searchResults.map((item) => item.item);
    }

    // Apply category filters
    if (category.length > 0) {
      result = result.filter((product) => category.includes(product.category));
    }

    // Apply sorting
    if (sortOption === "high-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(result);
    setNoResults(result.length === 0 && search !== "");
  };

  const handleToggleCategory = (categoryId) => {
    toggleCategory({ target: { value: categoryId } });
  };

  const handleSort = (optionId) => {
    setSortOption(optionId);
  };

  const handleSearchChange = (text) => {
    setSearch(text);
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.key === "Enter") {
      searchInputRef.current.blur();
    }
  };

  const toggleFilterModal = () => {
    if (showFilter) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowFilter(false));
    } else {
      setShowFilter(true);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const applyFilters = () => {
    toggleFilterModal();
  };

  const resetFilters = () => {
    setSearch("");
    setSortOption("preference");
    categories.forEach((cat) => {
      if (category.includes(cat.id)) {
        handleToggleCategory(cat.id);
      }
    });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        await applyFilter();
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [category, search, products, sortOption]);

  useEffect(() => {
    setFilteredProducts(products);
    setNoResults(false);
  }, [products]);

  if (!fontsLoaded || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Progress.Circle 
          size={40} 
          indeterminate={true} 
          color="hotpink" 
          borderWidth={4}
          endAngle={0.8}
        />
      </View>
    );
  }

  const filterModalTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [windowHeight, 0],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={assets.left_arrow}
            style={[styles.navbar_img, { transform: [{ rotate: "180deg" }] }]}
          />
        </Pressable>
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Image source={assets.search_icon} style={styles.searchIcon} />
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Find Your Fashion....."
              placeholderTextColor="gray"
              value={search}
              onChangeText={handleSearchChange}
              onSubmitEditing={handleKeyDown}
              returnKeyType="search"
              maxLength={60}
            />
          </View>
        </View>
        <Pressable onPress={() => navigation.navigate("Wishlist")}>
          <Image source={assets.wishlist} style={styles.navbar_img} />
        </Pressable>
      </View>
      <View style={styles.collectionModule}>
        {noResults ? (
          <View style={styles.noResultsContainer}>
            <Image source={assets.no_products} style={styles.noResultsImage} />
            <Text style={styles.noResultsText}>
              Umm... No results found for the {"\n"}"{search}"
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                bestseller={item.bestseller}
                description={item.description}
                sizes={item.sizes}
                category={item.category}
                isWishlisted={isInWishlist(item._id)}
                onToggleWishlist={() => toggleWishlist(item._id)}
              />
            )}
            numColumns={2}
            contentContainerStyle={styles.flatListContent}
            ListFooterComponent={<View style={{ height: 60 }} />}
          />
        )}
      </View>

      {/* Filter Button at Bottom */}
      <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
        <Text style={styles.filterButtonText}>FILTER & SORT</Text>
      </TouchableOpacity>

      {/* Filter Modal */}
      {showFilter && (
        <Modal transparent={true} visible={showFilter} animationType="none">
          <Animated.View
            style={[
              styles.filterModalContainer,
              { transform: [{ translateY: filterModalTranslateY }] },
            ]}
          >
            <View style={styles.filterHeader}>
              <Text style={styles.filterHeaderText}>FILTERS</Text>
              <TouchableOpacity onPress={toggleFilterModal}>
                <Image source={assets.close_icon} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.filterContent}>
              {/* Categories Section */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>CATEGORIES</Text>
                <View style={styles.categoryContainer}>
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        styles.categoryButton,
                        category.includes(cat.id) &&
                          styles.categoryButtonSelected,
                      ]}
                      onPress={() => handleToggleCategory(cat.id)}
                    >
                      <Text
                        style={[
                          styles.categoryText,
                          category.includes(cat.id) &&
                            styles.categoryTextSelected,
                        ]}
                      >
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Sort Section */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>SORT BY</Text>
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.sortOption}
                    onPress={() => handleSort(option.id)}
                  >
                    <View style={styles.radioButton}>
                      {sortOption === option.id && (
                        <View style={styles.radioButtonSelected} />
                      )}
                    </View>
                    <Text style={styles.sortOptionText}>{option.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Filter Footer with Apply Button */}
            <View style={styles.filterFooter}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetFilters}
              >
                <Text style={styles.resetButtonText}>RESET</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilters}
              >
                <Text style={styles.applyButtonText}>APPLY</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbeaea",
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 5,
  },
  searchContainer: {
    paddingHorizontal: 10,
    minWidth: 220,
    flex: 1,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: "hotpink",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
  },
  searchIcon: {
    height: 26,
    width: 26,
  },
  searchInput: {
    flex: 1,
    height: 20,
    fontSize: 14,
    fontFamily: "Prata-Regular",
    color: "#333",
  },
  collectionModule: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 50,
  },
  flatListContent: {
    paddingBottom: 20,
    alignItems: "center",
  },
  navbar_img: {
    width: 32,
    height: 32,
    flex: 0,
  },
  filterButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "hotpink",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  filterButtonText: {
    color: "white",
    fontFamily: "Outfit-Regular",
    fontSize: 16,
    fontWeight: "bold",
  },
  filterModalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: Dimensions.get("window").height * 0.85,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  filterHeaderText: {
    fontFamily: "Outfit-Regular",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  filterContent: {
    flex: 1,
  },
  filterSection: {
    marginBottom: 25,
  },
  filterSectionTitle: {
    fontFamily: "Outfit-Regular",
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 15,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f5f5f5",
  },
  categoryButtonSelected: {
    backgroundColor: "hotpink",
    borderColor: "hotpink",
  },
  categoryText: {
    fontFamily: "Outfit-Regular",
    fontSize: 14,
    color: "#333",
  },
  categoryTextSelected: {
    color: "white",
  },
  sortOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "hotpink",
  },
  sortOptionText: {
    fontFamily: "Outfit-Regular",
    fontSize: 15,
    color: "#333",
  },
  filterFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  resetButton: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    marginRight: 10,
  },
  resetButtonText: {
    fontFamily: "Outfit-Regular",
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  applyButton: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "hotpink",
    borderRadius: 25,
  },
  applyButtonText: {
    fontFamily: "Outfit-Regular",
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noResultsImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  noResultsText: {
    fontFamily: "Outfit-Regular",
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbeaea',
    padding: 20,
  },
});

export default Collection;
