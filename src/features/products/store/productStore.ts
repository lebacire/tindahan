import { create } from "zustand";
import { getProducts, saveProducts } from "../../../services/productStorage";
import { Product } from "../types";

type ProductState = {
    products: Product[];
    search: string;
    setSearch: (value: string) => void;
    loadProducts: () => Promise<void>;
    addProduct: (product: Product) => Promise<void>;
    removeProduct: (id: string) => Promise<void>;
    updateProduct: (product: Product) => Promise<void>;
};

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    search: "",
    setSearch: (value) => {
        set({
            search: value
        })
    },
    loadProducts: async () => {
        const data = await getProducts();

        if (data) {
            set({ products: JSON.parse(data) });
        } else {
            set({
                products: [
                    {
                        id: "1",
                        name: "Marlboro Red (stick)",
                        price: 9,
                        stock: 39,
                        category: "Cigarettes",
                        unit: "stick",
                        lowStock: 10,
                        cost: 6,
                    },
                    {
                        id: "2",
                        name: "Lucky Me Pancit Canton",
                        price: 16,
                        stock: 4,
                        category: "Noodles",
                        unit: "pack",
                        lowStock: 5,
                        cost: 10,
                    },
                    {
                        id: "3",
                        name: "Coke Sakto 200ml",
                        price: 15,
                        stock: 18,
                        category: "Drinks",
                        unit: "bottle",
                        lowStock: 5,
                        cost: 12,
                    },
                    {
                        id: "4",
                        name: "Argentina Corned Beef 150g",
                        price: 36,
                        stock: 3,
                        category: "Canned",
                        unit: "can",
                        lowStock: 5,
                        cost: 24,
                    },
                    {
                        id: "5",
                        name: "Safeguard Bar Soap",
                        price: 30,
                        stock: 9,
                        category: "Toiletries",
                        unit: "pc",
                        lowStock: 5,
                        cost: 18,
                    },
                    {
                        id: "6",
                        name: "Mineral Water",
                        price: 12,
                        stock: 14,
                        category: "Drinks",
                        unit: "bottle",
                        lowStock: 5,
                        cost: 8,
                    },
                ],
            });
        }
    },

    addProduct: async (product) => {
        const updated = [...get().products, product];

        set({ products: updated });

        await saveProducts(JSON.stringify(updated));
    },

    removeProduct: async (id) => {
        const updated = get().products.filter((p) => p.id !== id);

        set({ products: updated });

        await saveProducts(JSON.stringify(updated));
    },

    updateProduct: async (product) => {
        const updated = get().products.map((p) =>
            p.id === product.id ? product : p
        );

        set({ products: updated });

        await saveProducts(JSON.stringify(updated));
    },
}));