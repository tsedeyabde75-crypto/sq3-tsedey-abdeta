import { NextResponse } from 'next/server';

let orders = [];

export async function GET() {
  return NextResponse.json(orders, { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json();

    const newOrder = {
      id: body.id || `ORD-${Date.now()}`,
      status: body.status || 'Pending',
      items: body.items || [],
      totalAmount: body.totalAmount || 0,
      deliveryAddress: body.deliveryAddress || body.address || '',
      telebirrPhone: body.telebirrPhone || body.paymentAccount || '',
      createdAt: body.createdAt || new Date().toISOString(),
      
      paymentMethod: body.paymentMethod || 'telebirr',
      specialInstructions: body.specialInstructions || '',
    };

    orders.unshift(newOrder);

    return NextResponse.json(
      { message: 'Order created successfully', order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { message: 'Failed to process order' },
      { status: 500 }
    );
  }
}