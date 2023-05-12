import { users } from '@clerk/nextjs/dist/api';
import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Set the paths that don't require the user to be signed in
const publicPaths = ['/', '/sign-in', '/sign-up']

const isPublic = (path: string): boolean => {
    return publicPaths.find((x: string) =>
      path.match(new RegExp(`^${x}$`.replace('$', '($|/)')))
    ) !== undefined;
  };
  

export default  withClerkMiddleware(async(request: NextRequest) => {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next()
  }
  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(request)
  
  if (!userId) {
    // redirect the users to /pages/sign-in/[[...index]].ts  
    return NextResponse.redirect(pushToUrl(request,'/sign-in'))
  }

  const role =(await users.getUser(userId as string)).publicMetadata.role
  // // !If Admin Or User
  if (
    request.nextUrl.pathname.startsWith("/admin" ||"/api/admin") &&
    role !== "ADMIN"
  ) {
    return NextResponse.redirect(pushToUrl(request,'/not-found'))
  }
  // // Check if the request is for a user API and the user is neither a user nor an admin
  if (
    request.nextUrl.pathname.startsWith("/api/user") &&
    role !== "USER" &&
    role !== "ADMIN"
  ) {
    return NextResponse.redirect(pushToUrl(request,'/not-found'))
  }


  //!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  request.headers.set('userAuth',userId as string)
  return NextResponse.next()
})

export const config = { matcher: [ '/((?!_next/image|_next/static|favicon.ico).)','/admin/:path*','/users/:path*',"/api/user/:path*",'/api/admin/:path*','/api/shop/create-shop','/api/shop/my-shop']};



const pushToUrl = (req:NextRequest,url:string)=>{
  const stringUrl = new URL(url, req.url)
  stringUrl.searchParams.set('redirect_url', req.url)
  return stringUrl as URL;
}