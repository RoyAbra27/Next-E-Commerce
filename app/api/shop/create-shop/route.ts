import { Image, PrismaClient, Shop } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import shopValidation, { bodyRequest } from "@/validation/shopValidation";
import { users } from "@clerk/nextjs/dist/api";

const prisma = new PrismaClient();

// create new shop
export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  const { userId } = auth() as { userId: string };
  const user = await users.getUser(userId);
  const bodyData: bodyRequest = await req.json();
  const validate = shopValidation.create(bodyData);
  if (validate.error) {
    return NextResponse.json(
      { message: validate.error.details[0].message, status: "failed" },
      { status: 400 }
    );
  }

  try {
    const shop: Shop = await prisma.shop.create({
      data: {
        name: bodyData.name,
        description: bodyData.description,
        owner_id: userId,
      },
    });

    if (!shop) return NextResponse.json({ shop });

    await prisma.image.create({
      data: {
        image_url: bodyData.logo,
        shop_id: shop.id,
      },
    });

    await prisma.image.create({
      data: {
        image_url: bodyData.coverImage,
        shop_id: shop.id,
      },
    });

    if (shop) users.updateUser(userId, { publicMetadata: {role:user.publicMetadata.role,shop: true } });
    return NextResponse.json({
      message: "Shop Created Successfully",
      status: "success",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Shop Creation Failed",
      status: "failed",
    });
  }
}
