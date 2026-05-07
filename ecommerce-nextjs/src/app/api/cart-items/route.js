import { NextResponse } from 'next/server';

// This must be outside the function to persist during your dev session
let cart = [];

export async function GET(request) {
  console.log('GET request received at /api/cart');
  return NextResponse.json(cart);
}

export async function POST(request) {
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
        deliveryOptionId: '1', // Default delivery option
      });
    }

    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
