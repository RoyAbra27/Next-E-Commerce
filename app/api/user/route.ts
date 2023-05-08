import {NextResponse  } from "next/server";

 
export async function GET(request: Request) {
    const data = { msg: 'I am User'};
    return NextResponse.json({data});
}

