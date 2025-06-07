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
      <Section title="ASSETS" backgroundColor="#D4EDDA" />
      <Section title="SAVINGS" backgroundColor="#CCE5FF" />
      <Section title="LIABILITIES" backgroundColor="#F8D7DA" />
    </View>
  );
}
