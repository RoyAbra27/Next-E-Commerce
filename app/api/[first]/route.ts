import { log } from "console";
import {NextResponse  } from "next/server";

 
export async function GET(request: Request,{params}:{params:{first:string}}) {
    return NextResponse.json({first:params.first});
}

