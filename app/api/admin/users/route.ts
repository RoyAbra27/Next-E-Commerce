import { User, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export interface UserInterface {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    profileImageUrl:string
}
export async function GET(req: Request) {
    if(req.method !== "GET"){
      return NextResponse.json({msg:"Method not allowed"}, { status: 405 });
    }

    try{
        const data = await clerkClient.users.getUserList() as User[];
        const users = [] as UserInterface[]
        data.forEach(user => {
            const userObj = {
                id:user.id,
                email:user.emailAddresses[0].emailAddress,
                role:user.publicMetadata.role,
                firstName:user.firstName,
                lastName:user.lastName,
                profileImageUrl:user.profileImageUrl
            } as UserInterface;
            users.push(userObj)
        });
       return NextResponse.json(users)
    }catch(error){
        console.log(error)
    }
  }
  