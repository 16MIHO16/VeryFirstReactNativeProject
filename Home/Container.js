import React, { useContext } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartContext } from "/Users/Acer/Desktop/ReactNativeProject/Context/CartContext";

function Container(props) {
  const { cartItems, setCartItems } = useContext(CartContext);
  const addToCart = async () => {
    try {
      const existingItems = await AsyncStorage.getItem("cartItems");
      let updatedCartItems = [];
      if (existingItems) {
        updatedCartItems = JSON.parse(existingItems);
      }

      updatedCartItems.push(props.product);

      await AsyncStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      setCartItems(updatedCartItems);

      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  return (
    <View style={styles.Box}>
      <Image style={styles.Thumbnail} source={{ uri: props.image }} />
      <Text style={styles.Price}>{props.price} ₾</Text>
      <Text style={styles.Title} numberOfLines={2} ellipsizeMode="tail">
        {props.name}
      </Text>
      <TouchableOpacity style={styles.AddButton} onPress={addToCart}>
        <FontAwesomeIcon style={styles.faCartShopping} icon={faCartShopping} />
        <Text>დამატება</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  Box: {
    marginBottom: 20,
  },
  Title: {
    marginTop: 6,
    marginBottom: 16,
    maxWidth: 160,
  },
  Thumbnail: {
    width: 160,
    height: 140,
    marginRight: 20,
    marginBottom: 16,
  },
  Price: {
    marginBottom: 4,
    fontWeight: "bold",
  },
  AddButton: {
    borderRadius: 10,
    height: 40,
    width: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(232, 236, 252)",
  },
  faCartShopping: {
    marginRight: 8,
  },
});

export default Container;
