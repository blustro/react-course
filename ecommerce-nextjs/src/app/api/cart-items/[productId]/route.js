import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  const { productId } = await params;
  const { quantity, deliveryOptionId } = await request.json();

  const item = cart.find((i) => i.productId === productId);
  if (item) {
    if (quantity !== undefined) item.quantity = Number(quantity);
    if (deliveryOptionId) item.deliveryOptionId = deliveryOptionId;
    return NextResponse.json(item);
  }
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function DELETE(request, { params }) {
  const { productId } = await params;
  cart = cart.filter((item) => item.productId !== productId);
  return new Response(null, { status: 204 });
}
