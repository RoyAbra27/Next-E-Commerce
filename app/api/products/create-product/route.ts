import { auth } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

type productProps = {
  name: string;
  description?: string;
  price: number;
  images?: string[];
  categories?: [];
  shop_id: number;
};

// add new product
/**
 * This is a TypeScript function that handles a POST request for creating a new product, checking for
 * authentication and required fields.
 * @param {Request} req - The parameter `req` is of type `Request`, which is an object representing an
 * HTTP request made by the client. It contains information such as the request method, headers, and
 * body.
 * @returns If the request method is not POST, a response with a status of 405 and a message "Method
 * not allowed" is being returned. If the title of the new product is empty, a response with a status
 * of 400 and a message "Title is required" is being returned.
 */
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
    return NextResponse.json(error);
  }
}
