import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Get shop by other user - by url param
export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string | number } }
) {
  console.log(id, typeof id);
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  if (typeof id === 'string' && id.startsWith('user')) {
    try {
      const shop = await prisma.shop.findUnique({
        where: {
          owner_id: id as string,
        },
        select: {
          name: true,
          description: true,
          logo: true,
          owner_id: true,
          products: { orderBy: { created_at: 'desc' } },
        },
      });
      return NextResponse.json(shop);
    } catch (error) {
      console.log(error);
      return NextResponse.json(error);
    }
  }
  try {
    const shopId = parseInt(id as string);
    const shop = await prisma.shop.findUnique({
      where: {
        id: shopId as number,
      },
      select: {
        name: true,
        description: true,
        logo: true,
        owner_id: true,
      },
    });
    return NextResponse.json(shop);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
