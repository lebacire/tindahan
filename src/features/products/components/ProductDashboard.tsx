import {
    StyleSheet,
    View
} from "react-native";

import Typography from "../../../components/ui/Typography";
import { useProductStore } from "../store/productStore";
import {
    getInventoryValue,
    getLowStockProducts,
    getTotalProducts
} from "../selectors";

export default function ProductDashboard() {
    const products = useProductStore((state) => state.products);

    const total = getTotalProducts(products);
    const value = getInventoryValue(products);
    const lowStock = getLowStockProducts(products);

    return (
        <View style={styles.container}>
            <View style={styles.summaryRow}>
                <View style={styles.statCard}>
                    <Typography variant="caption" style={styles.statLabel}>
                        Products
                    </Typography>
                    <Typography variant="title" style={styles.statValue}>
                        {total}
                    </Typography>
                </View>
                <View style={styles.statCard}>
                    <Typography variant="caption" style={styles.statLabel}>
                        Inventory Value
                    </Typography>
                    <Typography variant="title" style={styles.statValue}>
                        ₱{value}
                    </Typography>
                </View>
            </View>

            {lowStock.length > 0 && (
                <View style={styles.lowStockCard}>
                    <View style={styles.lowStockHeader}>
                        <Typography variant="title">Low stock</Typography>
                        <Typography variant="caption" style={styles.lowStockCount}>
                            {lowStock.length}
                        </Typography>
                    </View>

                    {lowStock.map((product) => (
                        <View style={styles.lowStockItem} key={product.id}>
                            <View>
                                <Typography variant="body" style={styles.productName}>
                                    {product.name}
                                </Typography>
                                <Typography variant="caption" style={styles.productMeta}>
                                    ₱{product.price} · {product.stock} pack
                                </Typography>
                            </View>
                            <Typography variant="caption" style={styles.stockBadge}>
                                {product.stock} pack
                            </Typography>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        marginBottom: 8,
    },
    summaryRow: {
        flexDirection: "row",
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: "#FDE2C8",
    },
    statLabel: {
        color: "#6B7280",
        marginBottom: 8,
    },
    statValue: {
        color: "#111827",
    },
    lowStockCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 18,
        borderWidth: 1,
        borderColor: "#FDE2C8",
    },
    lowStockHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },
    lowStockCount: {
        color: "#F97316",
        fontWeight: "700",
    },
    lowStockItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: "#F8F1EA",
    },
    productName: {
        fontWeight: "700",
    },
    productMeta: {
        color: "#6B7280",
        marginTop: 4,
    },
    stockBadge: {
        color: "#DC2626",
        fontWeight: "700",
    },
});
