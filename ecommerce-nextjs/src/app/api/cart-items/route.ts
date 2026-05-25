import { NextResponse } from 'next/server';
import products from '@/data/products.json';
import { CartItem } from '@/types';

let cart: CartItem[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const expand = searchParams.get('expand');

  if (expand === 'product') {
    const expandedCart = cart.map((item) => {
      const productDetails = products.find(
        (product) => product.id === item.productId,
      );

      return {
        ...item,
        product: productDetails,
      };
    });
    return NextResponse.json(expandedCart);
  }
  return NextResponse.json(cart);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('POST request body:', body);

    const existingItem = cart.find((item) => item.productId === body.productId);

    if (existingItem) {
      existingItem.quantity += body.quantity || 1;
    } else {
      cart.push({
        productId: body.productId,
        quantity: body.quantity || 1,
        deliveryOptionId: '1',
      });
    }

    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
