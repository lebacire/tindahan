import { StyleSheet, View } from "react-native";
import Typography from "../../components/ui/Typography";

export default function Pautang() {
  return (
    <View style={styles.container}>
      <Typography variant="title">Pautang</Typography>
      <Typography>Manage your credit and collection records in one place.</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});