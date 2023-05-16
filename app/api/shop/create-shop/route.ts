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
  const bodyData: bodyRequest = await req.json();
  const validate = shopValidation.create(bodyData);
  if (validate.error) {
    return NextResponse.json(
      { message: validate.error.details[0].message, status: "failed" },
      { status: 400 }
    );
  }



  try {
    const {coverImage,description,logo,name} = bodyData
   const logo_image= await prisma.image.create({
      data: {
        image_url: logo
      },
    }) as Image ;

    const cover_image = await prisma.image.create({
      data: {
        image_url: coverImage
      },
    }) as Image;
    
    const shop: Shop = await prisma.shop.create({
      data: {
        name: name,
        description: description,
        owner_id: userId,
        logo_image_id: logo_image.id,
        cover_image_id: cover_image.id,
      },
    });


  

    return NextResponse.json({
      message: "Shop Created Successfully",
      status: "success",
    });
  } catch (error)
   {
    return NextResponse.json({
      message: "Shop Creation Failed",
      status: "failed",
    });
  }
}
