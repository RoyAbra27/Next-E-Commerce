import { Image, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

const prisma = new PrismaClient();

type shopProps = {
  name?: string;
  description?: string;
  active?: boolean;
};

// get my shop
export async function GET(req: Request) {
  const { userId } = auth();

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
        logo_image: {select: {image_url: true}},
        cover_image: {select: {image_url: true}},
        owner_id: true,
        products: { orderBy: { created_at: 'desc' } },
      },
    });
    console.log(myShop);
    if (!myShop) {
      return NextResponse.json({ message: 'Shop not found', isShop: false }, { status: 404 });
    }
    const shop = {
      name: myShop.name,
      description: myShop.description,
      logo: myShop.logo_image?.image_url as string,
      coverImage: myShop.cover_image?.image_url as string,
      owner_id: myShop.owner_id,
      products: myShop.products,
    }
    
    return NextResponse.json({myShop:shop,isShop:true});
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function PUT(req: Request) {
  const { userId } = auth();

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
        active: updateDetails.active,
      },
    });
    return NextResponse.json(updateShop);
  } catch (error) {
    return NextResponse.json(error);
  }
}
