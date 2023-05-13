import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

const prisma = new PrismaClient();

type shopProps = {
  name: string;
  description?: string;
  owner_id: string;
};

// create new shop
export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  const { userId } = auth();
  const shop: shopProps = await req.json();
  if (!shop.name.length) {
    return new Response('Title is required', { status: 400 });
  }
  console.log(1);
  try {
    const newShop = await prisma.shop.create({
      data: {
        name: shop.name,
        description: shop.description as string,
        owner_id: userId as string,
        logo: 'Placeholder.png',
      },
    });

    return NextResponse.json(newShop);
  } catch (error) {
    console.log(error);
    return NextResponse.json(null);
  }
}
