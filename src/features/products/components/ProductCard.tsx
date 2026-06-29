

import { router } from "expo-router";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Typography from "../../../components/ui/Typography";
import { useProductStore } from "../store/productStore";
import {
    Product
} from "../types";
type Props = {
    product: Product;
};



export default function ProductCard({ product }: Props) {

    const removeProduct = useProductStore(
        (state) => state.removeProduct
    );

    return (

        <Card>


            <Typography variant="title">

                {product.name}

            </Typography>


            <Typography>

                Price: ₱{product.price}

            </Typography>


            <Typography>

                Stock: {product.stock}

            </Typography>
            <Button
                title="Edit"
                onPress={() => {
                    router.push({
                        pathname: "/edit-product",
                        params: {
                            id: product.id
                        }
                    });
                }}
            />
            <Button
                title="Delete"
                onPress={() => removeProduct(product.id)}
            />
        </Card>

    )

}