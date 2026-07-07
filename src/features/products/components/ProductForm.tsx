import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    StyleSheet,
    View,
} from "react-native";

import Input from "../../../components/forms/Input";
import Button from "../../../components/ui/Button";

import {
    useProductStore,
} from "../store/productStore";

import { Product } from "../types";

const schema = z.object({
    name: z.string().min(2),
    barcode: z.string().optional(),
    category: z.string().optional(),
    unit: z.string().optional(),
    stock: z.string(),
    lowStock: z.string().optional(),
    cost: z.string().optional(),
    price: z.string(),
});

type FormData = z.infer<typeof schema>;

type Props = {
    product?: Product;
    onClose?: () => void;
};

export default function ProductForm({
    product,
    onClose,
}: Props) {
    const addProduct = useProductStore((state) => state.addProduct);
    const updateProduct = useProductStore((state) => state.updateProduct);

    const {
        handleSubmit,
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: product?.name ?? "",
            barcode: product?.barcode ?? "",
            category: product?.category ?? "Snacks",
            unit: product?.unit ?? "pc",
            stock: product ? String(product.stock) : "0",
            lowStock: product?.lowStock ? String(product.lowStock) : "5",
            cost: product?.cost ? String(product.cost) : "0",
            price: product ? String(product.price) : "0",
        },
    });

    function submit(data: FormData) {
        const payload: Product = {
            id: product?.id ?? Date.now().toString(),
            name: data.name,
            price: Number(data.price),
            stock: Number(data.stock),
            barcode: data.barcode,
            category: data.category,
            unit: data.unit,
            lowStock: Number(data.lowStock ?? "5"),
            cost: Number(data.cost ?? "0"),
        };

        if (product) {
            updateProduct(payload);
        } else {
            addProduct(payload);
        }

        onClose?.();
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Product name"
                defaultValue={product?.name}
                onChangeText={(v) => setValue("name", v)}
            />
            <Input
                placeholder="Barcode / SKU"
                defaultValue={product?.barcode}
                onChangeText={(v) => setValue("barcode", v)}
            />
            <View style={styles.fieldRow}>
                <Input
                    placeholder="Category"
                    defaultValue={product?.category ?? "Snacks"}
                    onChangeText={(v) => setValue("category", v)}
                    style={styles.halfField}
                />
                <Input
                    placeholder="Unit"
                    defaultValue={product?.unit ?? "pc"}
                    onChangeText={(v) => setValue("unit", v)}
                    style={styles.halfField}
                />
            </View>
            <View style={styles.fieldRow}>
                <Input
                    placeholder="Quantity"
                    keyboardType="numeric"
                    defaultValue={product ? String(product.stock) : "0"}
                    onChangeText={(v) => setValue("stock", v)}
                    style={styles.halfField}
                />
                <Input
                    placeholder="Low-stock alert"
                    keyboardType="numeric"
                    defaultValue={product?.lowStock ? String(product.lowStock) : "5"}
                    onChangeText={(v) => setValue("lowStock", v)}
                    style={styles.halfField}
                />
            </View>
            <View style={styles.fieldRow}>
                <Input
                    placeholder="Puhunan (cost ₱)"
                    keyboardType="numeric"
                    defaultValue={product?.cost ? String(product.cost) : "0"}
                    onChangeText={(v) => setValue("cost", v)}
                    style={styles.halfField}
                />
                <Input
                    placeholder="Tinda (price ₱)"
                    keyboardType="numeric"
                    defaultValue={product ? String(product.price) : "0"}
                    onChangeText={(v) => setValue("price", v)}
                    style={styles.halfField}
                />
            </View>
            <View style={styles.actions}>
                <Button
                    title="Cancel"
                    variant="outline"
                    onPress={() => onClose?.()}
                    style={styles.cancelButton}
                />
                <Button
                    title="Save"
                    onPress={handleSubmit(submit)}
                    style={styles.saveButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
    },
    fieldRow: {
        flexDirection: "row",
        gap: 12,
    },
    halfField: {
        flex: 1,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        marginTop: 10,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: "#F4F1EE",
    },
    saveButton: {
        flex: 1,
    },
});
