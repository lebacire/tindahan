import { useMemo, useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import Button from "../../components/ui/Button";
import Typography from "../../components/ui/Typography";
import ProductCard from "../../features/products/components/ProductCard";
import ProductForm from "../../features/products/components/ProductForm";
import ProductSearch from "../../features/products/components/ProductSearch";
import { useProductStore } from "../../features/products/store/productStore";
import { Product } from "../../features/products/types";

export default function Stock() {
  const products = useProductStore((state) => state.products);
  const search = useProductStore((state) => state.search);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      ),
    [products, search]
  );

  const openNewProductModal = () => {
    setSelectedProduct(null);
    setModalVisible(true);
  };

  const openEditProductModal = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <View style={styles.page}>
      <View style={styles.headerCard}>
        <View>
          <Typography variant="title" style={styles.pageTitle}>
            Stock
          </Typography>
          <Typography style={styles.subtitle}>
            {filteredProducts.length} products
          </Typography>
        </View>

        <Button
          title="+"
          variant="warning"
          onPress={openNewProductModal}
          style={styles.addButton}
        />
      </View>

      <View style={styles.searchRow}>
        <ProductSearch style={styles.searchInput} />
        <Pressable style={styles.filterButton}>
          <Typography style={styles.filterText}>≡</Typography>
        </Pressable>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => openEditProductModal(product)}
          />
        ))}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Typography variant="title">
                {selectedProduct ? "Edit product" : "New product"}
              </Typography>
              <Pressable onPress={closeModal} style={styles.modalClose}>
                <Typography style={styles.modalCloseText}>×</Typography>
              </Pressable>
            </View>
            <ProductForm product={selectedProduct ?? undefined} onClose={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F4F1EE",
    padding: 20,
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  pageTitle: {
    fontSize: 28,
  },
  subtitle: {
    color: "#6B7280",
    marginTop: 4,
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
  },
  searchRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
  },
  filterButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  filterText: {
    fontSize: 24,
    color: "#111827",
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: 14,
    paddingBottom: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalClose: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F4F1EE",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseText: {
    fontSize: 20,
    color: "#111827",
  },
});