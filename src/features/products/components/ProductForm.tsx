import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    StyleSheet,
    View
} from "react-native";
import { z } from "zod";
import Input from "../../../components/forms/Input";
import Button from "../../../components/ui/Button";
import {
    useProductStore
} from "../store/productStore";

const schema = z.object({
    name: z.string()
        .min(2, "Name too short"),
    price: z.string(),
    stock: z.string()
});

type FormData =
    z.infer<typeof schema>;

export default function ProductForm() {
    const addProduct =
        useProductStore(
            (state) => state.addProduct
        );

    const {
        register,
        handleSubmit,
        setValue
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    function submit(data: FormData) {
        addProduct({
            id: Date.now().toString(),
            name: data.name,
            price: Number(data.price),
            stock: Number(data.stock),
        });
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Product name"
                onChangeText={(value) =>
                    setValue("name", value)
                }
            />
            <Input
                placeholder="Price"
                keyboardType="numeric"
                onChangeText={(value) =>
                    setValue("price", value)
                }
            />
            <Input
                placeholder="Stock"
                keyboardType="numeric"
                onChangeText={(value) =>
                    setValue("stock", value)
                }
            />
            <Button
                title="Add Product"
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