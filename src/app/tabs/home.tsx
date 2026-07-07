import { router } from "expo-router";
import { useEffect } from "react";
import {
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import Button from "../../components/ui/Button";
import Typography from "../../components/ui/Typography";
import ProductDashboard from "../../features/products/components/ProductDashboard";
import { useProductStore } from "../../features/products/store/productStore";
import { useAuthStore } from "../../store/authStore";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const loadUser = useAuthStore((state) => state.loadUser);
  const products = useProductStore((state) => state.products);
  const loadProducts = useProductStore((state) => state.loadProducts);

  const inventoryValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const debt = Math.max(45, products.length * 12 + 5);

  const displayName = user?.email.split("@")[0] || "antifarrah";

  useEffect(() => {
    loadUser();
    loadProducts();
  }, []);

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.container}>
      <View style={styles.headerCard}>
        <View style={styles.greetingRow}>
          <Typography variant="caption" style={styles.greetingText}>
            Kumusta,
          </Typography>
          <Typography variant="title" style={styles.greetingName}>
            {displayName}
          </Typography>
        </View>

        <View style={styles.topStatsRow}>
          <View style={styles.topStatCard}>
            <Typography variant="caption" style={styles.topStatLabel}>
              Stock value
            </Typography>
            <Typography variant="title" style={styles.topStatValue}>
              ₱{inventoryValue}
            </Typography>
          </View>
          <View style={[styles.topStatCard, styles.topStatCardCol]}>
            <Typography variant="caption" style={styles.topStatLabel}>
              Utang to collect
            </Typography>
            <Typography variant="title" style={styles.topStatValue}>
              ₱{debt}
            </Typography>
          </View>
        </View>

        <View style={styles.actionRow}>
          <Button
            title="Add stock"
            variant="secondary"
            onPress={() => router.push("/add-product")}
            style={styles.addButton}
          />
          <Button
            title="Record sale"
            variant="warning"
            onPress={() => router.push("/add-product")}
            style={styles.saleButton}
          />
        </View>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Typography variant="caption" style={styles.summaryLabel}>
            Stock
          </Typography>
          <Typography variant="title" style={styles.summaryValue}>
            {totalStock}
          </Typography>
        </View>
        <View style={styles.summaryCard}>
          <Typography variant="caption" style={styles.summaryLabel}>
            Utang
          </Typography>
          <Typography variant="title" style={styles.summaryValue}>
            {debt}
          </Typography>
        </View>
        <View style={styles.summaryCard}>
          <Typography variant="caption" style={styles.summaryLabel}>
            Find
          </Typography>
          <Typography variant="title" style={styles.summaryValue}>
            Suppliers
          </Typography>
        </View>
      </View>

      <ProductDashboard />
      <View style={styles.footerSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FEF3E8",
    flex: 1,
  },
  container: {
    padding: 20,
    gap: 18,
    paddingBottom: 40,
  },
  headerCard: {
    backgroundColor: "#F97316",
    borderRadius: 30,
    padding: 24,
    gap: 20,
  },
  greetingRow: {
    gap: 6,
  },
  greetingText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
  },
  greetingName: {
    color: "#FFFFFF",
    fontSize: 32,
    lineHeight: 38,
  },
  topStatsRow: {
    flexDirection: "row",
    gap: 12,
  },
  topStatCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    minHeight: 120,
    justifyContent: "space-between",
  },
  topStatCardCol: {
    backgroundColor: "#FFF4E6",
  },
  topStatLabel: {
    color: "#6B7280",
    marginBottom: 10,
  },
  topStatValue: {
    color: "#111827",
    fontSize: 20,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  addButton: {
    flex: 1,
    backgroundColor: "#101827",
  },
  saleButton: {
    flex: 1,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 12,
  },
  footerSpacer: {
    height: 120,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F5E3D3",
  },
  summaryLabel: {
    color: "#6B7280",
    marginBottom: 8,
  },
  summaryValue: {
    color: "#111827",
  },
  footerBar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 18,
    borderWidth: 1,
    borderColor: "#F5E3D3",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },
  footerItem: {
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  footerIcon: {
    width: 30,
    height: 30,
    borderRadius: 999,
    backgroundColor: "#F5F5F5",
  },
  footerIconActive: {
    backgroundColor: "#F97316",
  },
  footerLabel: {
    color: "#6B7280",
  },
  footerLabelActive: {
    color: "#F97316",
    fontWeight: "700",
  },
});