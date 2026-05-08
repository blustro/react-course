import { NextResponse } from 'next/server';

let orders = [];

export async function POST(request) {
  const newOrder = {
    id: crypto.randomUUID(),
    orderTimeMs: Date.now(),
    products: [],
  };

  orders.unshift();

  return NextResponse.json(newOrder, { status: 201 });
}

export async function GET() {
  return NextResponse.json(orders);
}
