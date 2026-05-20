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
  products: OrderProduct[];
}

export interface AddToCartArgs {
  productId: string;
  quantity: number;
}

export interface AddToCartResponse {
  productId: string;
  quantity: number;
}
export interface CartState {
  items: CartItem[];
  deliveryOptions: DeliveryOption[];
  summary: {
    totalCents: number;
    shippingCents: number;
    estimatedTaxCents: number;
  } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'error';
  error: string | null | undefined;
}

export interface UpdateCartArgs {
  productId: string;
  updates: { quantity: number };
}

export interface OrderProduct extends CartItem {
  estimatedDeliveryTimeMs: number;
}

export interface TrackingState {
  order: Order | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
