import {
    StyleSheet,
    View
} from "react-native";
import Typography from "../components/ui/Typography";
import ProductForm from "../features/products/components/ProductForm";

export default function AddProduct() {
    return (
        <View style={styles.container}>
            <Typography variant="title">
                Add Product
            </Typography>
            <ProductForm />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    }
});