import { Product } from "./types";


export function getTotalProducts(
    products: Product[]
) {

    return products.length;

}



export function getInventoryValue(
    products: Product[]
) {

    return products.reduce(
        (total, product) =>
            total + product.price * product.stock,
        0
    );

}



export function getLowStockProducts(
    products: Product[]
) {

    return products.filter(
        product => product.stock <= 5
    );

}