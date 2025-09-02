export interface ReceiptItem {
  name: string;
  price: number;
  quantity: number;
}

export interface ReceiptData {
  vendorName: string;
  transactionDate: string;
  totalAmount: number | null;
  items: ReceiptItem[];
}
