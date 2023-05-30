import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// get all products
export async function GET(req: Request) {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const products = await prisma.product.findMany({
      select: {
        name: true,
        description: true,
        shop_id: true,
        images: true,
        categories: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
