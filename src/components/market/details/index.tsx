import { MarketType } from "@/types/market";
import { Text, View } from "react-native";
import { s } from "./styles";
import { Info } from "../info";
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";

type DetailsProps = {
  data: MarketType;
};

export function Details({ data }: DetailsProps) {
  return (
    <View style={s.container}>
      <Text style={s.name}>{data.name}</Text>
      <Text style={s.description}>{data.description}</Text>

      <View style={s.group}>
        <Text style={s.title}>Informações</Text>

        <Info
          icon={IconTicket}
          description={`${data.coupons} cupons disponíveis`}
        />
        <Info icon={IconMapPin} description={data.address} />
        <Info icon={IconPhone} description={data.phone} />
      </View>
    </View>
  );
}
