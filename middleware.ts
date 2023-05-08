// Import NextRequest and NextResponse from the 'next/server' package
import { NextRequest, NextResponse as res } from "next/server";

// Import the 'jose' library for handling JWT tokens
import * as jose from "jose";
// Define an asynchronous middleware function that takes a NextRequest and res as arguments
export async function middleware(req: NextRequest) {
  // Retrieve the JWT token from the 'authorization' header of the request
  const token = req.headers.get("authorization") as string;
  
  // If the token is not present in the header, return an error with status 401 (Unauthorized)
  if (!token) {
    return res.json(
      {
        errorMessage:
          "Unauthorized request (need to send token to this endpoint)",
        status: 401,
      }
    );
  }

  // Encode the JWT_SECRET from the environment variables as a Uint8Array
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
 
  // Try to verify the JWT token using the 'jose' library and the secret
  try {
    const tokenData = (await jose.jwtVerify(token, secret)).payload;
    console.log(tokenData.role);
    // Check if the request is for an admin API and the user is not an admin
    if (
      req.nextUrl.pathname.startsWith("/api/admin") &&
      tokenData.role !== "ADMIN"
    ) {
      return  res.json(
       { errorMessage: "You are not Admin", status: 401 }
      );
    }
    // Check if the request is for a user API and the user is neither a user nor an admin
    if (
      req.nextUrl.pathname.startsWith("/api/user") &&
      tokenData.role !== "USER" &&
      tokenData.role !== "ADMIN"
    ) {
      return res.json(
        { errorMessage: "You are not User", status: 401 }
      );
    }
  // set a custom header on the request object
  req.headers.set('token-data', JSON.stringify(tokenData))
  // pass the modified req object to the route handler
  return res.next({ request:req })
  } catch (err) {
    // If the token verification fails, return an error with status 401 (Unauthorized)
    return res.json(
      {
        errorMessage: "Invalid token (expired or invalid)",
        status: 401
      }
    );
  }
}

// Define a configuration object for the middleware
export const config = {
  // Specify that the middleware should be applied to the '/api/auth/me' endpoint
  matcher: [
    "/api/admin/:path*",
    "/api/user/:path*"
  ],
};
