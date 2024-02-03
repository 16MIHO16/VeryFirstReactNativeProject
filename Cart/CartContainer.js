import React, { useContext } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartContext } from "/Users/Acer/Desktop/ReactNativeProject/Context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CartContainer(props) {
  const { cartItems, setCartItems } = useContext(CartContext);

  const removeFromCart = async () => {
    const itemIndexToRemove = cartItems.findIndex(
      (item) => item.name === props.name
    );
    if (itemIndexToRemove !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(itemIndexToRemove, 1);
      await AsyncStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    }
  };

  return (
    <View style={styles.CartContainerBox}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.Info}>
        <Text style={styles.title}>{props.name}</Text>

        <View style={styles.priceTrash}>
          <Text style={styles.price}>{props.price} ₾</Text>
          <TouchableOpacity
            onPress={removeFromCart}
            style={styles.removeButton}
          >
            <Text>
              <FontAwesomeIcon icon={faTrash} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  CartContainerBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 120,
    marginRight: 10,
  },
  Info: {
    flex: 1,
  },
  title: {
    maxWidth: 200,
    marginTop: 16,
    marginBottom: 10,
  },
  price: {
    marginTop: 6,
    marginBottom: 10,
  },
  priceTrash: {
    flexDirection: "row",
    alignItems: "center",
  },
  removeButton: {
    marginLeft: 70,
  },
});

export default CartContainer;
