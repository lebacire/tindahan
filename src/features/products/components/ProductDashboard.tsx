import {
    StyleSheet,
    View
} from "react-native";


import Typography from "../../../components/ui/Typography";


import {
    useProductStore
} from "../store/productStore";


import {
    getInventoryValue,
    getLowStockProducts,
    getTotalProducts
} from "../selectors";



export default function ProductDashboard(){


const products =
useProductStore(
(state)=>state.products
);



const total =
getTotalProducts(products);


const value =
getInventoryValue(products);


const lowStock =
getLowStockProducts(products);



return (

<View style={styles.container}>


<Typography variant="title">

Dashboard

</Typography>



<Typography>

Products: {total}

</Typography>



<Typography>

Inventory Value: ₱{value}

</Typography>



{
lowStock.length > 0 &&

<Typography>

⚠ Low Stock: {lowStock.length}

</Typography>

}



</View>

)

}



const styles = StyleSheet.create({

container:{

gap:8,

marginBottom:20,

}

});