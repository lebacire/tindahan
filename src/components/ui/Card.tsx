import {
    StyleSheet,
    View,
    ViewProps,
} from "react-native";

import { colors, spacing } from "../../theme";

export default function Card({
  children,
  style,
}: ViewProps) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
});