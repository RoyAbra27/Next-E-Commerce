import type { WebhookEvent } from "@clerk/clerk-sdk-node" 
import { users } from "@clerk/nextjs/dist/api";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const handler =async (req:Request) => {
    try{
        const evt = await req.json() as WebhookEvent; 
        if(evt.type === "user.created"){
            await users.updateUser(evt.data.id,{publicMetadata:{role:'USER',shop:false}})
            const {id} = evt.data;
            await prisma.user.create({
                data:{
                    id
                }
            })
        }
    
        return new Response(JSON.stringify({ok:true}))
    
    }catch(error){
        console.log(error)
    }
}

export { handler as GET , handler as POST}