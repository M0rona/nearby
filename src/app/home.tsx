import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { api } from "@/services/api";
import { Categories } from "@/components/categories";
import { CategoriesProps } from "@/types/categories";
import { PlaceProps } from "@/types/place";
import { Places } from "@/components/places";

type MarketsProps = PlaceProps;

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
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#cecece",
      }}
    >
      <Text>Home</Text>
      <Categories
        data={categories}
        selected={category}
        onSelect={setCategory}
      />

      <Places data={markets} />
    </View>
  );
}
