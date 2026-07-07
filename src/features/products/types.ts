export type Product = {
    id: string;
    name: string;
    price: number;
    stock: number;
    barcode?: string;
    category?: string;
    unit?: string;
    lowStock?: number;
    cost?: number;
};