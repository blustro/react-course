import { Order } from '@/types';
import { NextResponse } from 'next/server';

let orders: Order[] = [];

export async function POST(request: Request) {
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
