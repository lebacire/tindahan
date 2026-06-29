import Input from "../../../components/forms/Input";

import {
    useProductStore
} from "../store/productStore";


export default function ProductSearch() {


    const setSearch =
        useProductStore(
            (state) => state.setSearch
        );



    return (

        <Input

            placeholder="Search products"

            onChangeText={setSearch}

        />

    )

}