

import { Pressable, StyleSheet, View } from "react-native";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Typography from "../../../components/ui/Typography";
import { useProductStore } from "../store/productStore";
import {
    Product
} from "../types";
type Props = {
    product: Product;
    onEdit?: () => void;
};

function getCategory(name: string) {
    const text = name.toLowerCase();
    if (text.includes("rice") || text.includes("noodles")) return "Noodles";
    if (text.includes("cigarette") || text.includes("marlboro")) return "Cigarettes";
    if (text.includes("drink") || text.includes("coke")) return "Drinks";
    if (text.includes("soap") || text.includes("toiletries")) return "Toiletries";
    if (text.includes("corned") || text.includes("canned")) return "Canned";
    return "General";
}

export default function ProductCard({ product, onEdit }: Props) {
    const removeProduct = useProductStore(
        (state) => state.removeProduct
    );

    const category = product.category ?? getCategory(product.name);
    const isLowStock = product.stock <= 5;

    return (
        <Card style={styles.card}>
            <View style={styles.headerRow}>
                <View style={styles.titleGroup}>
                    <Typography variant="title" style={styles.productName}>
                        {product.name}
                    </Typography>
                    <Typography style={styles.productMeta}>
                        ₱{product.price}.00 · {category}
                    </Typography>
                </View>
                <View style={[styles.statusBadge, isLowStock ? styles.lowStock : styles.inStock]}>
                    <Typography variant="caption" style={styles.statusText}>
                        {isLowStock ? "Low stock" : "In stock"}
                    </Typography>
                </View>
            </View>

            <View style={styles.actionRow}>
                <Pressable style={styles.quantityButton}>
                    <Typography style={styles.quantityText}>-</Typography>
                </Pressable>
                <Typography style={styles.quantityValue}>{product.stock} {product.unit ?? "pc"}</Typography>
                <Button
                    title="+"
                    variant="warning"
                    onPress={() => onEdit?.()}
                    style={styles.plusButton}
                />
            </View>

            <View style={styles.buttonsRow}>
                <Button
                    title="Edit"
                    variant="outline"
                    onPress={() => onEdit?.()}
                    style={styles.editButton}
                />
                <Button
                    title="Delete"
                    variant="secondary"
                    onPress={() => removeProduct(product.id)}
                    style={styles.deleteButton}
                />
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 18,
        borderRadius: 20,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
        marginBottom: 16,
    },
    titleGroup: {
        flex: 1,
        gap: 6,
    },
    productName: {
        fontSize: 18,
    },
    productMeta: {
        color: "#6B7280",
        marginTop: 6,
    },
    statusBadge: {
        borderRadius: 999,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    inStock: {
        backgroundColor: "#DCFCE7",
    },
    lowStock: {
        backgroundColor: "#FEE2E2",
    },
    statusText: {
        color: "#111827",
        fontWeight: "700",
    },
    actionRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 16,
    },
    quantityButton: {
        width: 34,
        height: 34,
        borderRadius: 12,
        backgroundColor: "#F8F3EC",
        alignItems: "center",
        justifyContent: "center",
    },
    quantityText: {
        fontSize: 20,
        color: "#111827",
    },
    quantityValue: {
        fontSize: 18,
        fontWeight: "700",
    },
    plusButton: {
        width: 42,
        height: 42,
        borderRadius: 18,
        paddingHorizontal: 0,
    },
    buttonsRow: {
        flexDirection: "row",
        gap: 12,
    },
    editButton: {
        flex: 1,
    },
    deleteButton: {
        flex: 1,
    },
});