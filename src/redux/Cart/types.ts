export interface CartItem {
  id: string;
  title: string;
  price: number;
  qty: number;
  images?: { url: string }[];
  author?: string;
}

export interface CartState {
  cartItems: CartItem[];
  amount: number;
  total: number;
}

export interface IncreaseDecreasePayload {
  id: string;
}