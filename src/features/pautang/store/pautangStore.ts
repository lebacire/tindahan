import { create } from "zustand";
import { getStorage, setStorage } from "../../../services/storage";
import { PautangItem } from "../types";

type PautangState = {
  pautang: PautangItem[];
  tab: "unpaid" | "paid";
  setTab: (tab: "unpaid" | "paid") => void;
  loadPautang: () => Promise<void>;
  addPautang: (item: PautangItem) => Promise<void>;
  markPaid: (id: string) => Promise<void>;
};

export const usePautangStore = create<PautangState>((set, get) => ({
  pautang: [],
  tab: "unpaid",
  setTab: (tab) => set({ tab }),
  loadPautang: async () => {
    const data = await getStorage("pautang");
    if (data) {
      set({ pautang: JSON.parse(data) as PautangItem[] });
    } else {
      const defaultPautang: PautangItem[] = [
        {
          id: "1",
          customer: "Kuya Boy",
          amount: 45,
          items: "1 corned beef",
          contact: "09171234567",
          dueDate: new Date().toISOString().split("T")[0],
          status: "unpaid" as const,
        },
      ];

      set({ pautang: defaultPautang });
    }
  },
  addPautang: async (item) => {
    const updated = [...get().pautang, item];
    set({ pautang: updated });
    await setStorage("pautang", JSON.stringify(updated));
  },
  markPaid: async (id) => {
    const updated = get().pautang.map((item): PautangItem =>
      item.id === id ? { ...item, status: "paid" } : item
    );
    set({ pautang: updated });
    await setStorage("pautang", JSON.stringify(updated));
  },
}));