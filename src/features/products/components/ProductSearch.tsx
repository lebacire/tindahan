import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Input from "../../../components/forms/Input";
import BarcodeScannerModal from "../../../components/ui/BarcodeScannerModal";

import {
    useProductStore
} from "../store/productStore";


type Props = {
    style?: any;
};

export default function ProductSearch({ style }: Props) {

    const setSearch =
        useProductStore(
            (state) => state.setSearch
        );

    const [scannerOpen, setScannerOpen] = useState(false);

    const handleScanned = (data: string) => {
        setSearch(data);
    };

    return (
        <View style={styles.row}>
            <Input
                placeholder="Search products"
                onChangeText={setSearch}
                style={[styles.input, style]}
            />
            <Pressable style={styles.scanBtn} onPress={() => setScannerOpen(true)}>
                <Text style={styles.scanText}>Scan</Text>
            </Pressable>

            <BarcodeScannerModal
                visible={scannerOpen}
                onClose={() => setScannerOpen(false)}
                onScanned={handleScanned}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    input: {
        flex: 1,
    },
    scanBtn: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: "#0EA5A4",
        borderRadius: 8,
    },
    scanText: {
        color: "#fff",
        fontWeight: "600",
    }
});