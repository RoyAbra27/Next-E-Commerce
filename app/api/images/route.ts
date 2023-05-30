import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {},
});

const upload = multer({ storage: storage });

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  upload.single("image")
  // console.log(req.body);
  // console.log(req.json());
  // console.log(await upload.single("image"));
  try {
    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" });
  }
}
