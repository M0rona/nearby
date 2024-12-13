import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";

import { api } from "@/services/api";
import { Categories } from "@/components/categories";
import { Places } from "@/components/places";

import { colors, fontFamily } from "@/styles/theme";

import { CategoriesProps } from "@/types/categories";
import { PlaceProps } from "@/types/place";
import { router } from "expo-router";

type MarketsProps = PlaceProps & {
  latitude: number;
  longitude: number;
};

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState("");
  const [markets, setMarkets] = useState<MarketsProps[]>([]);

  async function fetchCategories() {
    await api
      .get("/categories")
      .then(({ data }) => {
        setCategories(data);
        setCategory(data[0].id);
      })
      .catch((error) => {
        Alert.alert("Categorias", "Erro ao carregar as categorias");
        console.error(error);
      });
  }
  async function fetchMarkets() {
    if (!category) return;
    await api
      .get("/markets/category/" + category)
      .then(({ data }) => {
        setMarkets(data);
      })
      .catch((error) => {
        Alert.alert("Locais", "Erro ao carregar os locais");
        console.log(error);
      });
  }

  // async function getCurrentLocation() {
  //   try {
  //     const { granted } = await Location.requestForegroundPermissionsAsync();

  //     if (granted) {
  //       const location = await Location.getCurrentPositionAsync();
  //       console.log(location);
  //     }
  //   } catch (error) {
  //     Alert.alert("Localização", "Erro ao obter a localização");
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#cecece",
      }}
    >
      <Categories
        data={categories}
        selected={category}
        onSelect={setCategory}
      />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          ...currentLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={currentLocation}
          image={require("@/assets/location.png")}
        />

        {markets.map((market) => (
          <Marker
            key={market.id}
            identifier={market.id}
            coordinate={{
              latitude: market.latitude,
              longitude: market.longitude,
            }}
            image={require("@/assets/pin.png")}
          >
            <Callout onPress={() => router.navigate(`/market/${market.id}`)}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium,
                  }}
                >
                  {market.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular,
                  }}
                >
                  {market.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Places data={markets} />
    </View>
  );
}
