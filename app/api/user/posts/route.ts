import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { sessions } from "@clerk/nextjs/dist/api";
import { auth, currentUser } from "@clerk/nextjs";

const prisma = new PrismaClient();

type postProps = {
  title: string;
  content: string;
  user_id: string;
};

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  const { userId } = auth();
  const post: postProps = await req.json();
  if (!post.title.length) {
    return new Response("Title is required", { status: 400 });
  }
  if (!post.content.length) {
    return new Response("Title is required", { status: 400 });
  }
  try {
    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        user_id: userId as string ,
      },
    });

    return NextResponse.json(newPost);
  } catch (error) {
    console.log(error);
    return NextResponse.json(null);
  }
}

export async function GET(req: Request) {
  const { userId } = auth();
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        user_id:userId as string,
      },
      select: {
        title: true,
        content: true,
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
