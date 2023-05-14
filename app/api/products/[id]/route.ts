import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Get product by other user - by url param
export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const productId = parseInt(id as string);
    const product = await prisma.product.findUnique({
      where: {
        id: productId as number,
      },
      select: {
        name: true,
        description: true,
        price: true,
        images: true,
        created_at: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
