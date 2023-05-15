import { auth } from "@clerk/nextjs";
import { User, users, } from "@clerk/nextjs/dist/api";
import {  PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { env } from "process";

const prisma = new PrismaClient();

export async function PUT(req: Request,{params:{id}}: {params:{id:string}}) {
  if(req.method !== "PUT"){
    return NextResponse.json({error:"Method not allowed"}, { status: 405 });
  }

  try{
    const {userId} = auth();
    const user = await users.getUser(userId as string) as User;
  
    if(id === user.id){   
      return NextResponse.json({error:"Cannot change your own status"}, { status: 400 });
    }
    
    if(id === env.SUPER_ADMIN_ID){
      return NextResponse.json({error:"Unauthorized Super Admin Cannot Change"}, { status: 400 });
    }

    const userToChange = await users.getUser(id as string) as User;

    if(user.publicMetadata.role === "ADMIN" && userToChange.publicMetadata.role === "USER"){
      await users.updateUser(id as string, { publicMetadata: {role:'ADMIN'} });
      return  NextResponse.json({status:true,msg:"User Changed to Admin"}, { status: 200 });
    }
  
    if(user.publicMetadata.role === "ADMIN"  && userToChange.publicMetadata.role === "ADMIN"){
      await users.updateUser(id as string, { publicMetadata: {role:'USER'} });
      return  NextResponse.json({status:true,msg:"Admin Changed to User"}, { status: 200 });
    }
  
  
  }catch(error){
    console.log(error)
    return NextResponse.json({error:"Something went wrong"}, { status: 500 });
  }


}
