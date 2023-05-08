 import { log } from "console";
import {NextResponse} from "next/server";
import { headers } from 'next/headers';

 
export async function GET(request: Request) {
    const { searchParams} = new URL(request.url);
    // Way 1 Headers
    const headersList = headers();
    const testHeader1 = headersList.get('testHeader');

   // Way 2 Headers
    const testHeader2 =request.headers.get('testHeader')

    //Way 1 Query Params
    const name = searchParams.get('search');

    const data = { msg: 'Hello, Next.js!',name, testHeader1,testHeader2};
    return NextResponse.json({data});
}

