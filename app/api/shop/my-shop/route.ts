import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient();

// get my shop
export async function GET(req: Request) {
  const { userId } = auth();
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const posts = await prisma.shop.findUnique({
      where: {
        owner_id:userId as string,
      },
      select: {
        name: true,
        description: true,
        logo: true,
        owner_id: true,
      },
      },
    );
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
