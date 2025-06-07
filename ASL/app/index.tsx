import { View } from "react-native";
import Section from "../components/Section";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Section title="ASSETS" />
      <Section title="SAVINGS" />
      <Section title="LIABILITIES" />
    </View>
  );
}
