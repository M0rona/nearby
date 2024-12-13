import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { router, useLocalSearchParams, Redirect } from "expo-router";
import { Alert, Text, View } from "react-native";
import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { MarketType } from "@/types/market";
import { Details } from "@/components/market/details";

type MarketProps = MarketType & {
  cover: string;
};

export default function Market() {
  const [data, setData] = useState<MarketProps>();
  const [isLoading, setIsLoading] = useState(true);
  const params = useLocalSearchParams<{ id: string }>();

  async function fetchMarket() {
    await api
      .get(`/markets/${params.id}`)
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Erro", "Erro ao buscar mercado", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Cover uri={data.cover} />

      <Details data={data} />
    </View>
  );
}
