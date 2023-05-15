import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

const prisma = new PrismaClient();
const { userId } = auth();

type shopProps = {
  name?: string;
  description?: string;
  logo?: string;
  active?: boolean;
};

// get my shop
export async function GET(req: Request) {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const myShop = await prisma.shop.findUnique({
      where: {
        owner_id: userId as string,
      },
      select: {
        name: true,
        description: true,
        logo: true,
        owner_id: true,
        products: { orderBy: { created_at: 'desc' } },
      },
    });
    return NextResponse.json(myShop);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function PUT(req: Request) {
  if (req.method !== 'PUT') {
    return new Response('Method not allowed', { status: 405 });
  }
  try {
    const updateDetails: shopProps = await req.json();
    if (updateDetails.name && !updateDetails.name.length) {
      return new Response('Title is required', { status: 400 });
    }
    const updateShop = await prisma.shop.update({
      where: {
        owner_id: userId as string,
      },
      data: {
        name: updateDetails.name,
        description: updateDetails.description,
        logo: updateDetails.logo,
        active: updateDetails.active,
      },
    });
    return NextResponse.json(updateShop);
  } catch (error) {
    return NextResponse.json(error);
  }
}
