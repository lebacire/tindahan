import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    StyleSheet,
    View
} from "react-native";


import Input from "../../../components/forms/Input";
import Button from "../../../components/ui/Button";


import {
    useProductStore
} from "../store/productStore";


import { Product } from "../types";


const schema = z.object({

    name: z.string()
        .min(2),

    price: z.string(),

    stock: z.string()

});


type FormData =
    z.infer<typeof schema>;



type Props = {

    product?: Product;

};



export default function ProductForm({
    product
}: Props) {


    const addProduct =
        useProductStore(
            (state) => state.addProduct
        );


    const updateProduct =
        useProductStore(
            (state) => state.updateProduct
        );



    const {
        handleSubmit,
        setValue
    } = useForm<FormData>({

        resolver: zodResolver(schema),

        defaultValues: {

            name: product?.name ?? "",

            price:
                product
                    ? String(product.price)
                    : "",


            stock:
                product
                    ? String(product.stock)
                    : ""

        }

    });



    function submit(data: FormData) {


        if (product) {


            updateProduct({

                ...product,

                name: data.name,

                price: Number(data.price),

                stock: Number(data.stock)

            });


        } else {


            addProduct({

                id: Date.now().toString(),

                name: data.name,

                price: Number(data.price),

                stock: Number(data.stock)

            });


        }


    }



    return (

        <View style={styles.container}>


            <Input

                placeholder="Product name"

                defaultValue={product?.name}

                onChangeText={(v) =>
                    setValue("name", v)
                }

            />



            <Input

                placeholder="Price"

                keyboardType="numeric"

                defaultValue={
                    product
                        ? String(product.price)
                        : ""
                }

                onChangeText={(v) =>
                    setValue("price", v)
                }

            />



            <Input

                placeholder="Stock"

                keyboardType="numeric"

                defaultValue={
                    product
                        ? String(product.stock)
                        : ""
                }

                onChangeText={(v) =>
                    setValue("stock", v)
                }

            />



            <Button

                title={
                    product
                        ? "Save Changes"
                        : "Add Product"
                }

                onPress={
                    handleSubmit(submit)
                }

            />



        </View>

    )

}



const styles = StyleSheet.create({

    container: {

        gap: 12

    }

});