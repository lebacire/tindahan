import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import Input from "../components/forms/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Typography from "../components/ui/Typography";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Card>
        <Typography variant="title">
          TindahanApp
        </Typography>
        <Typography>
          Your store management app
        </Typography>
        <Input
          placeholder="Search products"
        />
      </Card>

      <Button
        title="Get Started"
        onPress={() => {
          router.push("/login")
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 20,
  }
});