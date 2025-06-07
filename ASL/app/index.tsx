import {
    KeyboardAvoidingView,
    ScrollView,
    StatusBar,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Section from "../components/Section";

export default function Index() {
    return (
        <SafeAreaView
            edges={["top", "left", "right", "bottom"]}
            style={{ flex: 1 }}
        >
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <StatusBar backgroundColor="black" barStyle="dark-content" />
                <ScrollView style={{ flex: 1 }}>
                    <View
                        style={{
                            flex: 1,
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <Section title="ASSETS" backgroundColor="#D4EDDA" />
                        <Section title="SAVINGS" backgroundColor="#CCE5FF" />
                        <Section
                            title="LIABILITIES"
                            backgroundColor="#F8D7DA"
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
