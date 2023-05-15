import { auth } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

type productProps = {
  name: string;
  description?: string;
  price: number;
  images?: string[];
  category_id?: number[];
  shop_id: number;
};

// add new product
export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  const { userId } = auth();
  const NewProduct: productProps = await req.json();
  if (!NewProduct.name.length) {
    return new Response('Title is required', { status: 400 });
  }

  try {
    const myShop = await prisma.shop.findUnique({
      where: {
        owner_id: userId as string,
      },
      select: {
        id: true,
      },
    });

    const newProduct = await prisma.product.create({
      data: {
        name: NewProduct.name,
        description: NewProduct.description as string,
        price: NewProduct.price,
        shop_id: myShop?.id as number,
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(null);
  }
}
