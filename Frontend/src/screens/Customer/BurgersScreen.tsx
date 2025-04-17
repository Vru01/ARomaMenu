import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, Platform } from "react-native";

export default function BurgersScreen({ navigation }: any) {
  const burgerList = [
    { id: "1", title: "Cheese Burger", price: 199, type: "Veg", imageUrl: "https://www.oliveandmango.com/images/uploads/2021_06_21_classic_grilled_cheeseburger_1.jpg" },
    { id: "2", title: "Chicken Burger", price: 249, type: "Non-Veg", imageUrl: "https://www.kitchensanctuary.com/wp-content/uploads/2024/09/Buffalo-Chicken-Burger-square-FS-2.jpg" },
    { id: "3", title: "Veggie Burger", price: 229, type: "Veg", imageUrl: "https://cdn.veeg.co/app/uploads/2020/02/19143254/Pumpkin_Seed_Veggie_Burger_web_01_landscape.jpg" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>🍔 Burgers You Crave</Text>
      <FlatList
        data={burgerList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.tag}>
              <Text style={[styles.tagText, item.type === "Veg" ? styles.veg : styles.nonVeg]}>
                {item.type}
              </Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.footer}>
              <Text style={styles.price}>₹{item.price}</Text>
              <TouchableOpacity style={styles.addBtn}>
                <Text style={styles.addBtnText}>＋</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fef6f0",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ff6600",
    textAlign: "center",
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  image: {
    height: 180,
    borderRadius: 14,
    marginBottom: 12,
  },
  tag: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#eaeaea",
    borderRadius: 20,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 13,
    fontWeight: "600",
  },
  veg: {
    color: "green",
  },
  nonVeg: {
    color: "red",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  addBtn: {
    backgroundColor: "#ff6600",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 25,
  },
  addBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});