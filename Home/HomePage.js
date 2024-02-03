import React, { createContext, useContext, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import Container from "./Container";
import { SvgUri } from "react-native-svg";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomePage = ({ navigation }) => {
  const [storage, setStorage] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.vendoo.ge/api/beta/catalog?url=technics%2Ftelefonebi%2Fmobiluri-telefonebi&sort=popular&sortDir=desc&page=1&limit=20`
      )
      .then((response) => {
        setStorage(response.data.products);
      })
      .catch((error) => {
        console.error("Universities API Error:", error);
      });
  }, []);

  const renderContainer = ({ item }) => (
    <Container
      key={item.id}
      product={item}
      image={item.thumb_img.files.file}
      name={item.name}
      price={item.original_price}
    />
  );

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Header}>
        <SvgUri
          uri="https://vendoo.ge/icons/vendoo_logo.svg"
          style={styles.Logo}
        />
        <TouchableOpacity
          style={styles.FaCartShopping}
          onPress={() => {
            navigation.navigate("CartProduct");
          }}
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.Phones}
        data={storage}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderContainer}
        numColumns={2}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "white",
  },
  Phones: {
    paddingLeft: 20,
  },
  Logo: {
    width: 120,
    height: 30,
    marginLeft: 20,
    marginBottom: 30,
  },
  Header: {
    flexDirection: "row",
  },
  FaCartShopping: {
    marginTop: 9,
    marginLeft: 180,
  },
});

export default HomePage;
