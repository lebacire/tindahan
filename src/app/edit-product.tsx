import {
    StyleSheet,
    View,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import Typography from "../components/ui/Typography";
import ProductForm from "../features/products/components/ProductForm";

import {
    useProductStore
} from "../features/products/store/productStore";


export default function EditProduct() {

    const { id } = useLocalSearchParams();


    const product =
        useProductStore(
            (state) =>
                state.products.find(
                    (p) => p.id === id
                )
        );


    if (!product) {

        return null;

    }


    return (

        <View style={styles.container}>


            <Typography variant="title">

                Edit Product

            </Typography>


            <ProductForm
                product={product}
            />


        </View>

    )

}


const styles = StyleSheet.create({

    container: {

        flex: 1,

        padding: 20,

    }

});