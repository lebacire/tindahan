export type PautangItem = {
  id: string;
  customer: string;
  amount: number;
  items: string;
  contact: string;
  dueDate: string;
  status: "unpaid" | "paid";
};