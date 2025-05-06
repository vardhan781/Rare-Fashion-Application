import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { assets } from "../assets/assets";
import { SafeAreaView } from "react-native-safe-area-context";

const About = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Hero Image */}
        <Image
          source={assets.about_img}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Content Section */}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>About Us</Text>
            <View style={styles.underline}></View>
          </View>

          <View style={styles.paragraphs}>
            <Text style={styles.text}>
              Welcome to <Text style={styles.bold}>RARE FASHION</Text>,
            </Text>
            <Text style={styles.text}>
              where the spirit roams free and the heart beats wild.
            </Text>
            <Text style={styles.text}>
              Inspired by the wild beauty of the Rare Fashion, we celebrate
              diversity, individuality, and endless possibilities.
            </Text>
            <Text style={styles.text}>
              We're more than just a clothing line; we're a sanctuary for the
              daring, the dreamers, and the fiercely independent souls.
            </Text>
          </View>
        </View>

        {/* Decorative Elements */}
        <View style={styles.pinkCircle} />
        <View style={styles.petalAccent} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF9FB",
  },
  heroImage: {
    width: "100%",
    height: 500,
  },
  content: {
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#FF3E6C",
    fontFamily: "PlayfairDisplay_600SemiBold",
    marginBottom: 10,
  },
  underline: {
    width: 80,
    height: 3,
    backgroundColor: "#FF3E6C",
    borderRadius: 3,
  },
  paragraphs: {
    gap: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    fontFamily: "Lato_400Regular",
    textAlign: "center",
  },
  bold: {
    fontFamily: "Lato_700Bold",
    color: "#FF3E6C",
  },
  pinkCircle: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#FFD6E0",
    opacity: 0.3,
    right: -50,
    top: 100,
    zIndex: -1,
  },
  petalAccent: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#FFE5EC",
    opacity: 0.2,
    left: -50,
    bottom: 50,
    zIndex: -1,
    transform: [{ rotate: "45deg" }],
  },
});

export default About;
