import { router } from "expo-router";
import { useEffect } from "react";
import {
    StyleSheet,
    View
} from "react-native";
import Button from "../../components/ui/Button";
import Typography from "../../components/ui/Typography";
import ProductCard from "../../features/products/components/ProductCard";
import ProductDashboard from "../../features/products/components/ProductDashboard";
import ProductSearch from "../../features/products/components/ProductSearch";
import {
    useProductStore
} from "../../features/products/store/productStore";

export default function Home() {

    const products =
        useProductStore(
            (state) => state.products
        );


    const search =
        useProductStore(
            (state) => state.search
        );


    const filteredProducts =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

        );

    const loadProducts = useProductStore(
        (state) => state.loadProducts
    );

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <View style={styles.container}>
            <Typography variant="title">
                Products
            </Typography>
            <ProductDashboard />
            <Button
                title="Add Product"
                onPress={() => {
                    router.push("/add-product")
                }}
            />
            <ProductSearch />
            {
                filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 15,
    }
});