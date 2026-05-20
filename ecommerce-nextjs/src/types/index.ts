export interface Product {
  id: string;
  name: string;
  priceCents: number;
  rating: {
    stars: number;
    count: number;
  };
}

export interface CartItem {
  productId: string;
  quantity: number;
  deliveryOptionId: string;
  product?: Product;
}

export interface DeliveryOption {
  id: string;
  deliveryDays: number;
  priceCents: number;
}

export interface Order {
  id: string;
  orderTimeMs: number;
  totalCostCents: number;
  products: CartItem[];
}
