import { create } from "zustand";
import { getProducts, saveProducts } from "../../../services/productStorage";
import { Product } from "../types";

type ProductState = {
  products: Product[];

  loadProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],

  loadProducts: async () => {
    const data = await getProducts();

    if (data) {
      set({ products: JSON.parse(data) });
    } else {
      set({
        products: [
          { id: "1", name: "Rice", price: 50, stock: 20 },
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