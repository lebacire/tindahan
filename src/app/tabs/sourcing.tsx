import { StyleSheet, View } from "react-native";
import Typography from "../../components/ui/Typography";

export default function Sourcing() {
  return (
    <View style={styles.container}>
      <Typography variant="title">Sourcing</Typography>
      <Typography>Find suppliers and manage sourcing requests from here.</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});