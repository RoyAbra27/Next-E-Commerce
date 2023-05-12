"use client"
import { SignInButton, SignUpButton, SignedIn,SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import Navbar from "./nav/navbar"



const Header = () => {
  
  return (
    <div>
        {/* <SignedOut>
        <SignUpButton/>
        <SignInButton/>
        </SignedOut>
        <SignedIn>
        <UserButton/>
        <Link className="mx-2 bg-slate-300 p-2 rounded-xl" href={'/'}>Home</Link>
        <Link className="mx-2 bg-slate-300 p-2 rounded-xl" href={'/users/posts'}>My Posts</Link>
        <Link className="mx-2 bg-slate-300 p-2 rounded-xl" href={'/users/test'}>Test</Link>
        <Link className="mx-2 bg-slate-300 p-2 rounded-xl" href={'/admin/users'}>UserList</Link>
        </SignedIn> */}
     <Navbar/>
    </div>
  )
}

export default Header