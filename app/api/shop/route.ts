import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();




// get all shops
export async function GET(req: Request) {
    if (req.method !== "GET") {
      return new Response("Method not allowed", { status: 405 });
    }
  
    try {
      const shops = await prisma.shop.findMany({ 
        select: {
          name: true,
          description: true,
          logo: true,
          owner_id: true,
        },
      });
      return NextResponse.json(shops);
    } catch (error) {
      console.log(error);
      return NextResponse.json(error);
    }
  }
  

