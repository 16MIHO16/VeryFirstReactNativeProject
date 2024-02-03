import React, { useContext } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import CartContainer from "./CartContainer";
import { CartContext } from "/Users/Acer/Desktop/ReactNativeProject/Context/CartContext";

function CartProducts() {
  const { cartItems, setCartItems, clearCart, totalPrice } =
    useContext(CartContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={clearCart} style={styles.clearButton}>
        <Text>Clear Cart</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        {cartItems.length > 0 ? (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CartContainer
                key={item.id}
                image={item.thumb_img.files.file}
                name={item.name}
                price={item.original_price}
              />
            )}
          />
        ) : (
          <Text>No items in the cart</Text>
        )}
      </View>
      <Text style={styles.quantity}>
        {" "}
        Products quantity: {cartItems.length}
      </Text>
      {cartItems.length > 0 && (
        <Text style={styles.fullPrice}>Full Price is: {totalPrice} ₾</Text>
      )}

      <TouchableOpacity style={styles.buyButton}>
        <Text>Buy Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  clearButton: {
    padding: 10,
    backgroundColor: "lightgreen",
    alignItems: "center",
    width: "80%",
    marginLeft: 40,
    borderRadius: 20,
    marginBottom: 4,
  },
  safeArea: {
    backgroundColor: "white",
    flex: 1,
  },
  fullPrice: {
    marginLeft: 110,
    fontSize: 22,
    marginBottom: 20,
  },
  quantity: {
    fontSize: 18,
    marginLeft: 108,
    marginBottom: 10,
    marginTop: 10,
  },
  buyButton: {
    padding: 10,
    backgroundColor: "lightgreen",
    alignItems: "center",
    width: "90%",
    marginLeft: 20,
    marginBottom: 6,
    borderRadius: 20,
  },
});

export default CartProducts;
